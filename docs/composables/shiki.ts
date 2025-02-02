import type { Highlighter, Lang } from 'shiki-es'
import { getHighlighter } from 'shiki-es'
import { computed, ref, unref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import { useColorMode } from '#imports'

export const shiki = ref<Highlighter>()

export function loadShiki() {
  if (shiki.value)
    return
  // Only loading when needed
  return getHighlighter({
    themes: [
      'vitesse-dark',
      'vitesse-light',
    ],
    langs: [
      'css',
      'javascript',
      'typescript',
      'html',
      'vue',
      'vue-html',
      'bash',
      'diff',
    ],
  }).then((i) => {
    shiki.value = i
  })
}

export function renderCodeHighlight(code: MaybeRef<string>, lang?: Lang) {
  const colorMode = useColorMode()
  return computed(() => {
    if (!shiki.value)
      return code
    return shiki.value!.codeToHtml(unref(code), {
      lang,
      theme: colorMode.value === 'dark' ? 'vitesse-dark' : 'vitesse-light',
    }) || ''
  })
}
