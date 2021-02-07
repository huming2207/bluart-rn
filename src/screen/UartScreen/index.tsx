import React from 'react';
import { Platform } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewHtml } from './WebViewResource';

export default function UartScreen() {
  return (
    <>
      <WebView source={{ html: WebViewHtml }} scalesPageToFit={Platform.OS !== 'android'} />
    </>
  );
}
