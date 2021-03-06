﻿window.cxbird = window.cxbird || {};
(function (cxbird) {
    /** An image to be used by the application  
        @type Image
    */
    var bg1Img = new Image();
    /** An image to be used by the application  
        @type Image
    */
    var bg2Img = new Image();
    /** An image to be used by the application  
        @type Image
    */
    var bg3Img = new Image();

    //start loading backgrounds, must be after onload event handler
    bg1Img.src = '/theme/bg1.png';
    bg2Img.src = '/theme/bg2.png';
    bg3Img.src = '/theme/bg3.png';

    //constructor
    cxbird.Background = function (theme) {
        this.background1 = new cxbird.RepeatingGameObject(bg1Img, 0, 0, 1, 1200, 600, 1);
        this.background2 = new cxbird.RepeatingGameObject(bg2Img, 0, 10, 2, 800, 600, 0.5);
        this.background3 = new cxbird.RepeatingGameObject(bg3Img, 0, 2, 3, 800, 600, 0.2);
        this.xScroll = 0;
    };

    cxbird.Background.prototype.update = function (dt) {
        this.xScroll += 0.08 * dt;
        this.dt = dt;
    };

    cxbird.Background.prototype.draw = function (ctx) {
        this.background3.draw(this.dt, ctx, this.xScroll, 0);
        this.background2.draw(this.dt, ctx, this.xScroll, 0);
        this.background1.draw(this.dt, ctx, this.xScroll, 0);
    };

}(window.cxbird));