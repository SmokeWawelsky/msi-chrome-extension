[ 'info', 'warn', 'error' ].forEach((type) => {
  exports[type] = function(...args) {
    const entry = { type, time: new Date(), message: args.join(' ') };
    window.setTimeout(() => this.dispatch('log', entry));
    console[type](entry.message);
  };
});
