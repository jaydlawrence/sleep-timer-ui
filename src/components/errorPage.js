import React, { useEffect, useState } from 'react';
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/core'
import { MarginedButton } from './marginedButton';
import { HTTP_ERROR_MESSAGE } from '../constants';
export const ErrorPage = () => {
  return (
    <>
      <p>
        There was a problem with contacting the device.
      </p>
      <p>
        Please check device will and try again.
      </p>
      <MarginedButton
        variant="contained"
        onClick={() => window.location.reload(true)}
      >
        Reload
      </MarginedButton>
    </>
  )
}