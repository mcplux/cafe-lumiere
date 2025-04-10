import type { DefaultConfigOptions } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

export const formKitConfig: DefaultConfigOptions = {
  config: {
    classes: generateClasses({
      global: {
        label: 'block text-lg font-bold',
        input: 'w-full p-1 text-gray-700 rounded',
        message: 'bg-red-400 mt-2 p-1 rounded text-center',
      },
      form: {
        form: 'space-y-2 mt-2',
        submit: 'bg-gray-200',
      },
      submit: {
        input:
          'bg-amber-700 text-white font-bold text-lg mt-2 hover:bg-amber-800 transition-colors',
      },
    }),
  },
}
