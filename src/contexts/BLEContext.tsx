// BLEContext.js
import React from 'react';
import BluetoothLowEnergyApi from "../interfaces/BluetoothLowEnergyApi";

const bleContext = React.createContext<BluetoothLowEnergyApi | null>(null);

export default bleContext;
