import Fastify from 'fastify'
import { Server, Socket } from 'socket.io'
import dotenv from 'dotenv'
import { generateUniqueSessionId } from './utils/sessionUtils'
import { IRoles } from '../../types/IRoles'
import { IMessageData } from '../../types/IMessageData'
import { ISessionData } from './types/ISessionData'
import { IJoinSession } from './types/IJoinSession'

dotenv.config({ path: '../../.env' })

const isProd = process.env.NODE_ENV === 'production'
const port = Number(process.env.VITE_SERVER_PORT)

const fastify = Fastify({
  logger: isProd
    ? {
        level: 'warn', // Only show warnings and errors in production
      }
    : {
        level: 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            levelFirst: false,
            translateTime: false,
            ignore: 'pid,hostname,levelLabel,time,req,res,responseTime,reqId',
            messageFormat: '\n{msg}\n',
            colorize: true,
            singleLine: false,
            messageKey: 'msg',
            customColors: 'warn:gray,info:green,error:red',
          },
        },
        serializers: {
          req: () => undefined, // Don't log request objects
          res: () => undefined, // Don't log response objects
        },
      },
})

const io = new Server(fastify.server, {
  connectionStateRecovery: {},
  pingTimeout: 30000,
  pingInterval: 25000,
  cors: {
    origin: `${process.env.VITE_SERVER_URL}:${port}`,
    methods: ['GET', 'POST'],
  },
})

process.on('unhandledRejection', (reason, promise) => {
  fastify.log.error('Unhandled Promise Rejection:', reason)
})

const sessions: ISessionData = {}
const socketSessions: Map<string, string> = new Map()

io.on('connection', (socket: Socket) => {
  fastify.log.warn('')
  fastify.log.info(`Nouvelle connexion: ${socket.id}`)

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  socket.on('create-session', () => {
    const sessionId: string = generateUniqueSessionId(sessions)
    sessions[sessionId] = []

    socket.join(sessionId.toString())
    sessions[sessionId].push({ id: socket.id, role: IRoles.TEACHER })
    socketSessions.set(socket.id, sessionId)

    fastify.log.warn('')
    fastify.log.info(`Session ${sessionId} créée par ${socket.id}`)

    if (socket.connected) socket.emit('session-created', { sessionId })
  })

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  socket.on('check-session-status', (sessionId: string) => {
    const users = sessions[sessionId]?.map(client => client.id)
    if (socket.connected) socket.emit('session-status', users ? { users } : null)
  })

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  socket.on('join', (data: IJoinSession) => {
    const { sessionId, role } = data
    if (!sessions[sessionId]) {
      fastify.log.error(`Session ${sessionId} non trouvée`)
      if (socket.connected) socket.emit('error', { message: 'Session non trouvée' })
      return
    }

    socket.join(sessionId)
    sessions[sessionId].push({ id: socket.id, role })
    socketSessions.set(socket.id, sessionId)

    fastify.log.warn('')
    fastify.log.info(`Session ${sessionId} rejointe par ${socket.id} en tant que ${role}`)

    if (socket.connected) socket.emit('joined', { message: `Connecté à la session ${sessionId} en tant que ${role}` })
    if (socket.connected) socket.broadcast.to(sessionId).emit('user-joined', { id: socket.id, role })
  })

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  socket.on('message', (data: IMessageData) => {
    const { sessionId, content, role } = data
    if (!sessions[sessionId]) {
      return socket.emit('error', { message: 'Session non trouvée' })
    }

    fastify.log.warn('')
    fastify.log.info(`Message de ${socket.id} dans la session ${sessionId}: ${content}`)
    if (socket.connected) io.to(sessionId).emit('message', { from: role, content })
  })

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  socket.on('disconnect', () => {
    fastify.log.warn('')
    fastify.log.error(`Socket ${socket.id} déconnecté`)

    const sessionId = socketSessions.get(socket.id)

    if (sessionId && sessions[sessionId]) {
      // Remove the socket from the session
      sessions[sessionId] = sessions[sessionId].filter(client => client.id !== socket.id)
      socket.to(sessionId.toString()).emit('user-left', { id: socket.id })

      // If the session is empty, delete it
      if (sessions[sessionId].length === 0) {
        delete sessions[sessionId]

        fastify.log.warn('')
        fastify.log.error(`Session ${sessionId} is closed because its empty`)
      }
    }

    // Clean up the mapping
    socketSessions.delete(socket.id)
  })

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  socket.on('error', error => {
    fastify.log.error(`Socket error for ${socket.id}: ${error.message}`)
  })
})

const start = async () => {
  try {
    await fastify.listen({ port, host: '0.0.0.0' })
    fastify.log.info(`Serveur Fastify en écoute sur port ${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
