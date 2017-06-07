import React, { PureComponent } from 'react';
import { createMuiTheme } from 'material-ui/styles';
import { blue, amber } from 'material-ui/styles/colors';
import MuiThemeProvider, { MUI_SHEET_ORDER } from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/palette';

import AppFrame from './AppFrame';

let styleManager;

class App extends PureComponent {

  render() {
    const palette = createPalette({
      primary: blue,
      accent: amber,
      type: 'light',
    });

    const theme = createMuiTheme({ palette });

    if (!styleManager) {
      styleManager = MuiThemeProvider.createDefaultContext({ theme }).styleManager;
    } else {
      styleManager.updateTheme(theme);
    }

    styleManager.setSheetOrder(
      MUI_SHEET_ORDER.concat([

      ]),
    );

    return (
      <MuiThemeProvider theme={theme} styleManager={styleManager}>
        <AppFrame />
      </MuiThemeProvider>
    );
  }
}

export default App;
