(() => {
  const passiveEventsSupported = () => {
    let supported = false;

    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supported = true;
        },
      });

      window.addEventListener('test', null, opts);
    } catch (e) { }

    return supported;
  };

  const overwriteAddEvent = (superMethod) => {
    const patchedEvents = [
      'touchstart',
      'touchmove',
      'mousewheel',
    ];

    const defaultOptions = {
      passive: true,
      capture: false,
    };

    EventTarget.prototype.addEventListener = function (type, listener, options) {
      if (patchedEvents.includes(type)) {
        const usesListenerOptions = typeof options === 'object';
        const useCapture = usesListenerOptions ? options.capture : options;

        options = usesListenerOptions ? options : {};
        options.passive = options.passive !== undefined ? options.passive : defaultOptions.passive;
        options.capture = useCapture !== undefined ? useCapture : defaultOptions.capture;
      }

      superMethod.call(this, type, listener, options);
    };
  };

  if (passiveEventsSupported()) {
    const addEvent = EventTarget.prototype.addEventListener;
    overwriteAddEvent(addEvent);
  }
})();
