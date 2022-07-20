import React from 'react'
import Helmet from "react-helmet"

const metaData = ({title}) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default metaData
