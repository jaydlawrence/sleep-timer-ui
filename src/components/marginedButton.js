import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button } from '@material-ui/core';

const buttonCss = {
  margin: '25px 0'
}

export const MarginedButton = ({ children, ...props }) => (
  <div css={buttonCss}>
    <Button {...props}>{children}</Button>
  </div>
);