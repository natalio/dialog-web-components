/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import type { Gradient } from '../Avatar/utils/getAvatarColor';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getAvatarText from '../Avatar/utils/getAvatarText';
import getAvatarColor from '../Avatar/utils/getAvatarColor';
import createSequence from '../../utils/createSequence';
import fetchImage from '../../utils/fetchImage';
import Hover from '../Hover/Hover';
import styles from './AvatarDouble.css';

type AvatarProps = {
  title: ?string,
  image: ?string,
  placeholder: AvatarPlaceholder,
};

export type Props = {
  className?: string,
  big: AvatarProps,
  small: AvatarProps,
  size: number,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
};

export type State = {
  isBigImageLoaded: boolean,
  isSmallImageLoaded: boolean,
  currentBigImage: ?string,
  currentSmallImage: ?string,
  isHovered: boolean,
};

const seq = createSequence();

class AvatarDouble extends PureComponent<Props, State> {
  id: string;
  ids: {
    big: string,
    clip: string,
    small: string,
  };

  static defaultProps = {
    size: 32,
    big: {
      text: null,
      image: null,
      placeholder: 'empty',
    },
    small: {
      text: null,
      image: null,
      placeholder: 'empty',
    },
  };

  constructor(props: Props) {
    super(props);

    this.id = 'double_avatar_' + seq.next();
    this.ids = {
      big: `${this.id}_big`,
      clip: `${this.id}_big_clip`,
      small: `${this.id}_small`,
    };
    this.state = {
      isBigImageLoaded: false,
      isSmallImageLoaded: false,
      currentBigImage: null,
      currentSmallImage: null,
      isHovered: false,
    };

    if (props.big.image) {
      fetchImage(props.big.image).then(this.handleBigImageLoaded);
    }

    if (props.small.image) {
      fetchImage(props.small.image).then(this.handleSmallImageLoaded);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.big.image !== nextProps.big.image) {
      this.setState({ isBigImageLoaded: false });
      if (nextProps.big.image) {
        fetchImage(nextProps.big.image).then(this.handleBigImageLoaded);
      } else {
        this.setState({ currentBigImage: null });
      }
    }

    if (this.props.small.image !== nextProps.small.image) {
      this.setState({ isSmallImageLoaded: false });
      if (nextProps.small.image) {
        fetchImage(nextProps.small.image).then(this.handleSmallImageLoaded);
      } else {
        this.setState({ currentSmallImage: null });
      }
    }
  }

  handleBigImageLoaded = (): void => {
    this.setState({
      isBigImageLoaded: true,
      currentBigImage: this.props.big.image,
    });
  };

  handleSmallImageLoaded = (): void => {
    this.setState({
      isSmallImageLoaded: true,
      currentSmallImage: this.props.small.image,
    });
  };

  handleHover = (hover: boolean) => {
    this.setState({
      isHovered: hover,
    });
  };

  renderDefsBig() {
    const {
      big: { image, placeholder },
    } = this.props;
    const { isBigImageLoaded, currentBigImage } = this.state;

    if (isBigImageLoaded || currentBigImage !== null) {
      return (
        <pattern
          id={this.ids.big}
          width="100%"
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          <image
            x="0"
            y="0"
            width="100px"
            height="100px"
            xlinkHref={currentBigImage}
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      );
    }

    const colors: Gradient = getAvatarColor(placeholder);

    return (
      <linearGradient
        id={this.ids.big}
        gradientUnits="userSpaceOnUse"
        x1="100%"
        y1="100%"
        x2="0%"
        y2="0%"
      >
        <stop stopColor={colors.payload.from} />
        <stop offset="1" stopColor={colors.payload.to} />
      </linearGradient>
    );
  }

  renderClipMaskBig() {
    return (
      <clipPath id={this.ids.clip}>
        <path
          // eslint-disable-next-line
          d="M58.2070074,99.3297063 C55.5367715,99.7706374 52.795171,100 50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,0 50,0 C77.6142375,0 100,22.3857625 100,50 C100,52.795171 99.7706374,55.5367715 99.3297063,58.2070074 C94.8434182,55.5348957 89.6009561,54 84,54 C67.4314575,54 54,67.4314575 54,84 C54,89.6009561 55.5348957,94.8434182 58.2070074,99.3297063 Z"
        />
      </clipPath>
    );
  }

  renderDefsSmall() {
    const {
      small: { image, placeholder },
    } = this.props;
    const { isSmallImageLoaded, currentSmallImage } = this.state;

    if (isSmallImageLoaded || currentSmallImage !== null) {
      return (
        <pattern
          id={this.ids.small}
          width="100%"
          height="100%"
          x="58"
          y="58"
          patternUnits="userSpaceOnUse"
        >
          <image
            x="0"
            y="0"
            width="100px"
            height="100px"
            xlinkHref={currentSmallImage}
            transform="scale(0.507046569,0.507046569)"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      );
    }

    const colors: Gradient = getAvatarColor(placeholder);

    return (
      <linearGradient
        id={this.ids.small}
        gradientUnits="userSpaceOnUse"
        x1="6.79%"
        y1="105.31%"
        x2="93.21%"
        y2="-5.31%"
      >
        <stop stopColor={colors.payload.from} />
        <stop offset="1" stopColor={colors.payload.to} />
      </linearGradient>
    );
  }

  renderDefs() {
    return (
      <defs>
        {this.renderDefsBig()}
        {this.renderDefsSmall()}
        {this.renderClipMaskBig()}
      </defs>
    );
  }

  renderBigAvatar() {
    return (
      <path
        // eslint-disable-next-line
        d="M58.2070074,99.3297063 C55.5367715,99.7706374 52.795171,100 50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,0 50,0 C77.6142375,0 100,22.3857625 100,50 C100,52.795171 99.7706374,55.5367715 99.3297063,58.2070074 C94.8434182,55.5348957 89.6009561,54 84,54 C67.4314575,54 54,67.4314575 54,84 C54,89.6009561 55.5348957,94.8434182 58.2070074,99.3297063 Z"
        fill={`url(#${this.ids.big})`}
      />
    );
  }

  renderSmallAvatar() {
    return <circle cx="84" cy="84" r="25" fill={`url(#${this.ids.small})`} />;
  }

  renderPeerBigText() {
    const {
      big: { title },
    } = this.props;
    const { isBigImageLoaded, currentBigImage } = this.state;

    if (isBigImageLoaded || currentBigImage !== null || !title) {
      return null;
    }

    const { size } = this.props;
    const placeholderText = size > 20 ? getAvatarText(title) : null;

    if (!placeholderText) {
      return null;
    }

    return (
      <text
        className={styles.textBig}
        x="50"
        y="50"
        textAnchor="middle"
        alignmentBaseline="central"
        dominantBaseline="central"
        clipPath={`url(#${this.ids.clip})`}
      >
        {placeholderText}
      </text>
    );
  }

  renderPeerSmallText() {
    const {
      small: { title },
    } = this.props;
    const { isSmallImageLoaded, currentSmallImage } = this.state;

    if (isSmallImageLoaded || currentSmallImage !== null || !title) {
      return null;
    }

    const { size } = this.props;
    const placeholderText = size > 40 ? getAvatarText(title) : null;

    if (!placeholderText) {
      return null;
    }

    return (
      <text
        className={styles.textSmall}
        x="84"
        y="84"
        textAnchor="middle"
        alignmentBaseline="central"
        dominantBaseline="central"
      >
        {placeholderText}
      </text>
    );
  }

  renderBig() {
    return (
      <g className={styles.avatarBig}>
        {this.renderBigAvatar()}
        {this.renderPeerBigText()}
      </g>
    );
  }

  renderSmall() {
    return (
      <g className={styles.avatarSmall}>
        {this.renderSmallAvatar()}
        {this.renderPeerSmallText()}
      </g>
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
          className={styles.clickerBig}
          onClick={this.props.onClick}
        />
        <Hover
          onHover={this.handleHover}
          className={styles.clickerSmall}
          onClick={this.props.onClick}
        />
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
      <div style={{ width: size, height: size }} className={className}>
        {this.renderClicker()}
        <svg viewBox="0 0 109 109" shapeRendering="auto" className={styles.svg}>
          {this.renderDefs()}
          {this.renderBig()}
          {this.renderSmall()}
        </svg>
      </div>
    );
  }
}

export default AvatarDouble;
