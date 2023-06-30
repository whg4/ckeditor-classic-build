import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';

import fullScreenIcon from '../themes/icons/fullscreen.svg';

import '../themes/fullscreen.css';

export default class FullScreen extends Plugin {
	init() {
		const editor = this.editor

		editor.ui.componentFactory.add('FullScreen', (locale) => {
			const view = new ButtonView(locale)
			let state = 0
			view.set({
				label: 'Fullscreen',
				icon: fullScreenIcon,
				withText: false,
				tooltip: true,
			})

			view.on('execute', () => {
				if (state == 1) {
					document.body.removeAttribute('id')
					state = 0
				} else {
					document.body.setAttribute('id', 'fullscreenoverlay')
					state = 1
				}
			})

			return view
		})
	}
}