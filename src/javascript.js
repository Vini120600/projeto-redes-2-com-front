let port;
let reader;
let inputDone;
let outputDone;
let inputStream;
let outputStream;

document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });

        const textDecoder = new TextDecoderStream();
        inputDone = port.readable.pipeTo(textDecoder.writable);
        inputStream = textDecoder.readable;
        reader = inputStream.getReader();

        const textEncoder = new TextEncoderStream();
        outputDone = textEncoder.readable.pipeTo(port.writable);
        outputStream = textEncoder.writable;
        writer = outputStream.getWriter();

        document.getElementById('status').innerText = "Connected to ESP32";
        document.getElementById('toggleButton').disabled = false;
    } catch (error) {
        console.error('Error connecting to ESP32:', error);
        document.getElementById('status').innerText = "Failed to connect";
    }
});

document.getElementById('Lverde').addEventListener('click', async () => {
    if (writer) {
        await writer.write('presente\n');
        const { value } = await reader.read();
        if (value) {
            document.getElementById('status').innerText = value;
        }
    }
});

document.getElementById('Lamarelo').addEventListener('click', async () => {
    if (writer) {
        await writer.write('faltou\n');
        const { value } = await reader.read();
        if (value) {
            document.getElementById('status').innerText = value;
        }
    }
});