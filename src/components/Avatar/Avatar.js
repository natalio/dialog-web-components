/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getAvatarText from './utils/getAvatarText';
import getAvatarColor from './utils/getAvatarColor';
import createSequence from '../../utils/createSequence';
import styles from './Avatar.css';
import fetchImage from '../../utils/fetchImage';

export type Props = {
  title: ?string,
  image: ?string,
  size: number,
  placeholder: AvatarPlaceholder,
  className?: string,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
};

export type State = {
  isImageLoaded: boolean,
  currentImage: ?string,
};

const seq = createSequence();

/*
 * A component for displaying the user avatar.
 * If there is no image, it shows the initials from `title` on the gradient background
 */
class Avatar extends PureComponent<Props, State> {
  id: string;

  static defaultProps = {
    image: null,
    title: null,
    size: 32,
    placeholder: 'empty',
  };

  constructor(props: Props) {
    super(props);

    this.id = 'avatar_' + seq.next();
    this.state = {
      isImageLoaded: false,
      currentImage: null,
    };

    if (props.image) {
      fetchImage(props.image).then(this.handleImageLoaded);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.image !== nextProps.image) {
      if (nextProps.image) {
        this.setState({ isImageLoaded: false });
        fetchImage(nextProps.image).then(this.handleImageLoaded);
      } else {
        this.setState({
          isImageLoaded: false,
          currentImage: null,
        });
      }
    }
  }

  handleImageLoaded = (): void => {
    this.setState({
      isImageLoaded: true,
      currentImage: this.props.image,
    });
  };

  renderDefs() {
    const { placeholder } = this.props;
    const { isImageLoaded, currentImage } = this.state;

    if (isImageLoaded || currentImage !== null) {
      return (
        <defs>
          <pattern
            id={this.id}
            width="100%"
            height="100%"
            patternUnits="objectBoundingBox"
          >
            <image
              x="0"
              y="0"
              width="100%"
              height="100%"
              xlinkHref={currentImage}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
      );
    }

    const colors = getAvatarColor(placeholder);

    return (
      <defs>
        <linearGradient
          id={this.id}
          gradientUnits="userSpaceOnUse"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor={colors.payload.from} />
          <stop offset="100%" stopColor={colors.payload.to} />
        </linearGradient>
      </defs>
    );
  }

  renderText() {
    const { title, size } = this.props;
    const { isImageLoaded, currentImage } = this.state;

    if (isImageLoaded || currentImage !== null || !title) {
      return null;
    }

    const placeholderText = size >= 20 ? getAvatarText(title) : null;

    if (!placeholderText) {
      return null;
    }

    return (
      <text
        className={styles.text}
        x="50%"
        y="50%"
        textAnchor="middle"
        alignmentBaseline="central"
        dominantBaseline="central"
      >
        {placeholderText}
      </text>
    );
  }

  renderRect() {
    return (
      <rect fill={`url(#${this.id})`} x="0" y="0" width="100" height="100" />
    );
  }

  render() {
    const { size } = this.props;
    const className = classNames(
      styles.container,
      this.props.className,
      this.props.onClick ? styles.clickable : null,
    );

    return (
      <div
        style={{ width: size, height: size }}
        className={className}
        onClick={this.props.onClick}
        title={this.props.title}
      >
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          shapeRendering="auto"
        >
          {this.renderDefs()}
          {this.renderRect()}
          {this.renderText()}
        </svg>
      </div>
    );
  }
}

export default Avatar;
