import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const userInfo = 
    {
      email:'',
      emailVerified:false,
      uid:''  
    }


