/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder, UserStatusType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getAvatarText from './utils/getAvatarText';
import getAvatarColor from './utils/getAvatarColor';
import createSequence from '../../utils/createSequence';
import fetchImage from '../../utils/fetchImage';
import Hover from '../Hover/Hover';
import styles from './Avatar.css';

export type Props = {
  title: ?string,
  image: ?string,
  size: number,
  placeholder: AvatarPlaceholder,
  className?: string,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
  status?: ?UserStatusType,
};

export type State = {
  isImageLoaded: boolean,
  currentImage: ?string,
  isHovered: boolean,
};

const seq = createSequence();

class Avatar extends PureComponent<Props, State> {
  id: string;

  static defaultProps = {
    image: null,
    title: null,
    size: 32,
    placeholder: 'empty',
    status: null,
  };

  constructor(props: Props) {
    super(props);

    this.id = 'avatar_' + seq.next();
    this.state = {
      isImageLoaded: false,
      currentImage: null,
      isHovered: false,
    };

    if (props.image) {
      fetchImage(props.image).then(this.handleImageLoaded);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.image !== nextProps.image) {
      this.setState({ isImageLoaded: false });
      if (nextProps.image) {
        fetchImage(nextProps.image).then(this.handleImageLoaded);
      } else {
        this.setState({ currentImage: null });
      }
    }
  }

  handleImageLoaded = (): void => {
    this.setState({
      isImageLoaded: true,
      currentImage: this.props.image,
    });
  };

  handleHover = (hover: boolean) => {
    this.setState({
      isHovered: hover,
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

  renderMask() {
    if (!this.props.status || this.props.status === 'invisible') {
      return (
        <circle
          fill={`url(#${this.id})`}
          cx="50"
          cy="50"
          r="50"
          className={styles.mask}
        />
      );
    }

    return (
      <path
        // eslint-disable-next-line
        d="M68.393 96.508C62.7 98.762 56.495 100 50 100 22.386 100 0 77.614 0 50S22.386 0 50 0s50 22.386 50 50c0 6.495-1.238 12.7-3.492 18.393C93.083 65.643 88.734 64 84 64c-11.046 0-20 8.954-20 20 0 4.734 1.644 9.083 4.393 12.508z"
        fill={`url(#${this.id})`}
        className={styles.mask}
      />
    );
  }

  renderStatus() {
    if (!this.props.status || this.props.status === 'invisible') {
      return null;
    }

    return (
      <circle cx="84" cy="84" r="15" className={styles[this.props.status]} />
    );
  }

  renderClicker() {
    if (!this.props.onClick) {
      return null;
    }

    return (
      <div className={styles.clickerWrapper}>
        <Hover
          onHover={this.handleHover}
          className={styles.clickerMask}
          onClick={this.props.onClick}
        />
        {!this.props.status || this.props.status === 'invisible' ? null : (
          <Hover
            onHover={this.handleHover}
            className={styles.clickerStatus}
            onClick={this.props.onClick}
          />
        )}
      </div>
    );
  }

  render() {
    const { size } = this.props;
    const className = classNames(
      styles.container,
      this.props.className,
      this.state.isHovered ? styles.hovered : null,
    );

    return (
      <div
        style={{ width: size, height: size }}
        className={className}
        title={this.props.title}
      >
        {this.renderClicker()}
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          shapeRendering="auto"
          className={styles.svg}
        >
          {this.renderDefs()}
          {this.renderMask()}
          {this.renderText()}
          {this.renderStatus()}
        </svg>
      </div>
    );
  }
}

export default Avatar;
