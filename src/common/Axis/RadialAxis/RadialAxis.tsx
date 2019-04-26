import React, { Component, Fragment } from 'react';
import {
  RadialAxisTickSeries,
  RadialAxisTickSeriesProps
} from './RadialAxisTickSeries';
import {
  RadialAxisArcSeries,
  RadialAxisArcSeriesProps
} from './RadialAxisArcSeries';
import { CloneElement } from '../../utils/children';

export interface RadialAxisProps {
  height: number;
  width: number;
  xScale: any;
  innerRadius: number;
  arcs: JSX.Element | null;
  ticks: JSX.Element | null;
}

export class RadialAxis extends Component<RadialAxisProps, {}> {
  static defaultProps: Partial<RadialAxisProps> = {
    innerRadius: 10,
    arcs: <RadialAxisArcSeries />,
    ticks: <RadialAxisTickSeries />
  };

  render() {
    const { arcs, ticks, xScale, height, width, innerRadius } = this.props;
    const outerRadius = Math.min(height, width) / 2;

    return (
      <Fragment>
        {arcs && (
          <CloneElement<RadialAxisArcSeriesProps>
            element={arcs}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
          />
        )}
        {ticks && (
          <CloneElement<RadialAxisTickSeriesProps>
            element={ticks}
            scale={xScale}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          />
        )}
      </Fragment>
    );
  }
}
