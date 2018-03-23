import React, { Component } from 'react';
import PublicMap from '../../components/PublicMap';
import LayerSwitcher from '../../components/LayerSwitcher';
import OlFeatureInfo from '../../components/OlFeatureInfo';
import { Grid } from 'semantic-ui-react';
import '../../../assets/css/public-map.css';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: [],
            zoomToLayer: null,
            featureInfo: null
        }
        this.props.current.layers.map(item => {
            if (this.state.active.indexOf(item.id)) {
                this.state.active.push(item.id)
            }
            return item
        })
    }

    setActive(item) {
        var state = this.state
        const index = state.active.indexOf(item.id)
        if (index === -1) state.active.push(item.id)
        else state.active.splice(index, 1)
        this.setState(state)
    }

    setZoomToLayer(layer) {
        this.setState({
            ...this.state,
            zoomToLayer: layer
        })
    }

    onZoomDone() {
        this.setState({
            ...this.state,
            zoomToLayer: null
        })
    }

    onMapClick(coordinate, features) {
        this.setState({
            ...this.state,
            featureInfo: features
        })
    }

    render() {
        var { current } = this.props
        return (
            <div className="public-map">
                <h1 className="ui header">{ current.title }</h1>

                <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <LayerSwitcher map={current}
                            active={this.state.active}
                            onClick={(e, item) => this.setActive(item)}
                            onClickZoom={(e, item) => this.setZoomToLayer(item)}
                        />
                        <OlFeatureInfo features={this.state.featureInfo} />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={12}>
                        <PublicMap {...current }
                            active={this.state.active}
                            zoomToLayer={this.state.zoomToLayer}
                            onZoomDone={this.onZoomDone.bind(this)}
                            height="540px"
                            onSingleClick={(coords, feat) => this.onMapClick(coords, feat)}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Display;