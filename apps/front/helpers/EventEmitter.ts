type Callback = (...args: any[]) => any;

export default class EventEmitter {
  private callbacks: { [namespace: string]: { [event: string]: Callback[] } } = {};

  constructor() {
    this.callbacks['base'] = {};
  }

  /**
   * Registers one or more events.
   * @param _names A string containing one or more event names.
   * @param callback The callback to execute when the event is triggered.
   * @returns The instance, or false if there was an error.
   */
  on(_names?: string, callback?: Callback): this | false {
    if (!_names || _names === '') {
      console.warn('wrong names');
      return false;
    }
    if (!callback) {
      console.warn('wrong callback');
      return false;
    }

    const names = this.resolveNames(_names);
    names.forEach(_name => {
      const name = this.resolveName(_name);

      if (!this.callbacks[name.namespace]) {
        this.callbacks[name.namespace] = {};
      }
      if (!Array.isArray(this.callbacks[name.namespace][name.value])) {
        this.callbacks[name.namespace][name.value] = [];
      }
      this.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  /**
   * Unregisters one or more events.
   * @param _names A string containing one or more event names.
   * @returns The instance, or false if there was an error.
   */
  off(_names?: string): this | false {
    if (!_names || _names === '') {
      console.warn('wrong name');
      return false;
    }

    const names = this.resolveNames(_names);
    names.forEach(_name => {
      const name = this.resolveName(_name);

      if (name.namespace !== 'base' && name.value === '') {
        delete this.callbacks[name.namespace];
      } else {
        if (name.namespace === 'base') {
          for (const namespace in this.callbacks) {
            if (Array.isArray(this.callbacks[namespace][name.value])) {
              delete this.callbacks[namespace][name.value];

              if (Object.keys(this.callbacks[namespace]).length === 0) {
                delete this.callbacks[namespace];
              }
            }
          }
        } else if (this.callbacks[name.namespace] && Array.isArray(this.callbacks[name.namespace][name.value])) {
          delete this.callbacks[name.namespace][name.value];

          if (Object.keys(this.callbacks[name.namespace]).length === 0) {
            delete this.callbacks[name.namespace];
          }
        }
      }
    });

    return this;
  }

  /**
   * Triggers an event.
   * @param _name The event name.
   * @param _args Optional arguments to pass to the callbacks.
   * @returns The result of the first callback that returns a defined value.
   */
  trigger(_name?: string, _args?: any[]): any {
    if (!_name || _name === '') {
      console.warn('wrong name');
      return false;
    }
    let finalResult: any = undefined;
    let result: any;
    const args = Array.isArray(_args) ? _args : [];
    const names = this.resolveNames(_name);
    const name = this.resolveName(names[0]);

    if (name.namespace === 'base') {
      for (const namespace in this.callbacks) {
        if (this.callbacks[namespace] && Array.isArray(this.callbacks[namespace][name.value])) {
          this.callbacks[namespace][name.value].forEach(callback => {
            result = callback.apply(this, args);
            if (finalResult === undefined) {
              finalResult = result;
            }
          });
        }
      }
    } else if (this.callbacks[name.namespace] && Array.isArray(this.callbacks[name.namespace][name.value])) {
      if (name.value === '') {
        console.warn('wrong name');
        return this;
      }
      this.callbacks[name.namespace][name.value].forEach(callback => {
        result = callback.apply(this, args);
        if (finalResult === undefined) {
          finalResult = result;
        }
      });
    }

    return finalResult;
  }

  /**
   * Converts a string of event names into an array.
   * @param _names The event names as a string.
   * @returns An array of event names.
   */
  private resolveNames(_names: string): string[] {
    let names = _names;
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
    names = names.replace(/[,/]+/g, ' ');
    return names.split(' ');
  }

  /**
   * Parses an event name into its value and namespace.
   * @param name The event name.
   * @returns An object containing the original name, event value, and namespace.
   */
  private resolveName(name: string): { original: string; value: string; namespace: string } {
    const parts = name.split('.');
    const resolved = {
      original: name,
      value: parts[0],
      namespace: 'base'
    };

    if (parts.length > 1 && parts[1] !== '') {
      resolved.namespace = parts[1];
    }

    return resolved;
  }
}

export const useEventEmitter = new EventEmitter();
