export class Controller {
    /**
     * @protected
     * @property
     * @type {import("lit").ReactiveControllerHost}
     */
    _host;

    /**
     * @constructor
     * @param {import("lit").ReactiveControllerHost} host 
     */
    constructor(host){
        this._host = host;
        host.addController(this);
    }


    /**
     * @abstract
     * @method
     */
    hostConnected(){}
    /**
     * @abstract
     * @method
     */
    hostUpdate(){}
    /**
     * @abstract
     * @method
     */
    hostUpdated(){}
    /**
     * @abstract
     * @method
     */
    hostDisconnected(){}
}