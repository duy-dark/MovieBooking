import React from 'react';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

export default function MyLoading({ active}) {
  return (
    <LoadingOverlay
      active={active}
      spinner={<BounceLoader />}
      fadeSpeed={500}
      styles={{
        wrapper: {
          // width: window.innerWidth + 'px',
          // height: window.innerHeight + 'px',
          overflow: active ? 'hidden' : 'scroll'
        }
      }}
    >
    </LoadingOverlay>
  )
}
