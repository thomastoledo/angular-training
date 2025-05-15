import * as i0 from '@angular/core';
import { input, Component } from '@angular/core';

class PrysmVideoPlayerComponent {
    src = input.required();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: PrysmVideoPlayerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.10", type: PrysmVideoPlayerComponent, isStandalone: true, selector: "lib-prysm-video-player", inputs: { src: { classPropertyName: "src", publicName: "src", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<video [src]=\"src()\"></video>", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: PrysmVideoPlayerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-prysm-video-player', imports: [], template: "<video [src]=\"src()\"></video>" }]
        }] });

/*
 * Public API Surface of prysm-ds
 */

/**
 * Generated bundle index. Do not edit.
 */

export { PrysmVideoPlayerComponent };
//# sourceMappingURL=prysm-ds.mjs.map
