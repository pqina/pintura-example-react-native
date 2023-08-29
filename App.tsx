import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

// PinturaEditor component import
import PinturaEditor from '@pqina/react-native-pintura';

// Pintura imports
import {
  createMarkupEditorToolStyle,
  createMarkupEditorToolStyles,
} from '@pqina/pintura';

function App(): JSX.Element {
  const [editorEnabled, setEditorEnabled] = useState(true);

  const [editorSource, setEditorSource] = useState<string | undefined>(
    undefined,
  );

  const editorRef = useRef<PinturaEditor>(null);

  return (
    <View style={styles.container}>
      {/* The Pintura Editor component */}

      {editorEnabled && (
        <PinturaEditor
          ref={editorRef}
          style={styles.pintura}
          styleRules={`
              .pintura-editor {
                  --color-background: 255, 255, 255;
                  --color-foreground: 0, 0, 0;
              }
          `}
          markupEditorToolStyles={createMarkupEditorToolStyles({
            text: createMarkupEditorToolStyle('text', {
              fontSize: '10%',
            }),
          })}
          imageCropAspectRatio={1}
          src={editorSource}
          onLoaderror={err => {
            console.log('onLoaderror', err);
          }}
          onLoad={({size}) => {
            console.log('onLoad', size);
          }}
          onProcess={({dest, imageState}) => {
            // dest is output file in dataURI format
            console.log('onProcess', imageState, dest);
          }}
        />
      )}

      <View style={styles.buttonRow}>
        {/* Example removing and adding the editor */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setEditorEnabled(!editorEnabled);
          }}>
          <Text style={styles.buttonTextStyle}>Toggle</Text>
        </TouchableOpacity>

        {/* Example running an editor function */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            if (!editorRef.current) {
              return;
            }

            // Run editor function
            editorRef.current.editor.history.undo();
          }}>
          <Text style={styles.buttonTextStyle}>Undo</Text>
        </TouchableOpacity>

        {/* Example selecting a library image */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={async () => {
            // Use ImagePicker to get a base64 image string
            let {assets, didCancel} = await launchImageLibrary({
              mediaType: 'mixed',
              selectionLimit: 1,
              quality: 1,
              includeBase64: true,
            });

            // user cancelled early
            if (didCancel || !assets) {
              return;
            }

            // get image reference
            const [asset] = assets;

            // Somehow the asset size can be 0
            if (!asset.uri || asset.width === 0 || asset.height === 0) {
              console.error('Failed to load', asset);
              return;
            }

            // video to base64
            let base64 = asset.base64;
            if (!base64) {
              base64 = await RNFS.readFile(asset.uri, 'base64');
            }

            // send data url to editor
            setEditorSource(`data:${asset.type};base64,${base64}`);
          }}>
          <Text style={styles.buttonTextStyle}>Browse...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pintura: {
    width: '95%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#eee',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: '#222',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonTextStyle: {
    fontSize: 14,
    color: '#fff',
  },
});

export default App;
