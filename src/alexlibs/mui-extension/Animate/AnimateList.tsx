import * as React from 'react'
import {Animate} from './index'

export interface AnimateListProps {
  delay?: number,
  initialDelay?: number,
}

class AnimateList extends React.Component<AnimateListProps, any> {

  state = {
    appeared: false,
  }

  private timeout: any

  render() {
    const {children, delay = 0, initialDelay = 0} = this.props
    return (
      <>
        {React.Children.map(children, (child, index) =>
          <Animate delay={initialDelay + index * delay}>
            {child}
          </Animate>
        )}
      </>
    )
  }

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({appeared: true}), this.props.delay || 0)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
}

export default AnimateList
