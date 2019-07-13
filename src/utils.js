import { EMBED_URL } from './constants'

export const getScriptTags = ({ document }) => {
  const scriptTags = document.getElementsByTagName('head')[0].childNodes
  const cuiEmbedScriptTags = [].filter.call(scriptTags, script => {
    return script.src === EMBED_URL
  })
  return cuiEmbedScriptTags
}

export const scriptTagExists = ({ document }) => {
  const scriptTags = getScriptTags({ document })

  return !!scriptTags.length
}
