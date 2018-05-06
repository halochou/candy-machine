function pair(prefix){
  navigator.bluetooth.requestDevice({
    // filters: [{ namePrefix: [0x0228] }]
    filters: [
      { namePrefix: [prefix] }
      ],
    optionalServices: ['86000990-4e7a-4441-b9f9-e3e4b18f38ed']
  })
  .then(function(device) {
    // Step 2: Connect to it
    console.log('device', device.uuid);
    return device.gatt.connect();
  })
  .then(function(server) {
    // Step 3: Get the Service via UUID
    console.log('server', server);
    return server.getPrimaryService('86000990-4e7a-4441-b9f9-e3e4b18f38ed');
  })
  .then(function(service) {
    console.log('service', service.uuid);
    // Step 4: get the Characteristic UUID
    return service.getCharacteristic('86000990-4e7a-4441-b9f9-e3e4b18f38ed');
  })
  .then(function(characteristic) {
    // Step 5: Write to the characteristic
    console.log('char', characteristic.properties.notify);
    state.ble = characteristic;
    return characteristic;
  })
  .catch(function(error) {
     // And of course: error handling!
     console.error('Connection failed!', error);
  });
}

function redeem(amount) {
    characteristic = state.ble;
    amount = amount > 5 ? 5 : amount;
    console.log(characteristic);
    var data = new Uint8Array([0x8b, 0x1f, 0x02, 0x1c, amount]);
    characteristic.writeValue(data);
    console.log('signal written');
    // characteristic.startNotifications().then(_ => {
    //   console.log('> Notifications started');
    //   characteristic.addEventListener('characteristicvaluechanged',
    //       handleNotifications);
    // });
}
