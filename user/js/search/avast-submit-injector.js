(function _submitInjector() {
    var f = document.querySelectorAll("form")[4]; // eslint-disable-line no-undef

    if (!f._avast_submit) {
        f._avast_submit = f.submit;
    }

    try {
        Object.defineProperty(f, "submit", {
            get() {
                return function (prev_submit) {
                    prev_submit.call(this);

                    if (this._avast_inside_submit) {
                        return;
                    }

                    this._avast_inside_submit = true;
                    var evt = document.createEvent("CustomEvent");
                    evt.initEvent("scriptsubmit", true, true); // bubbling & cancelable

                    this.dispatchEvent(evt);
                    delete this._avast_inside_submit;
                }.bind(this, this._avast_submit);
            },

            set(submitFunc) {
                this._avast_submit = submitFunc;
            }

        });
    } catch (ex) {// ignored
    }
})();