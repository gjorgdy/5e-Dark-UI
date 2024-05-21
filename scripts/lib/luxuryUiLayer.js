export class LuxuryUiLayer extends InteractionLayer {

    activate() {
        super.activate();
        console.log( 'LuxuryUiLayer.activate()' );
    }

    deactivate() {
        super.deactivate();
        console.log( 'LuxuryUiLayer.deactivate()' );
    }

}