import * as React from 'react';
import { Provider } from 'react-redux';
import { mount } from '@cypress/react'

import store from '/src/store/Store';
import CurrencyPicker from '/src/ui/CurrencyPicker'

describe('UI components tests', () => {
  it('CurrencyPicker', () => {
    mount(<Provider store={store}><CurrencyPicker /></Provider>)
    cy.get('input').invoke('val').should('equal', 'EUR')
  })
})
