function convertTemperature() {
    const temperatureInput = parseFloat(document.getElementById('temperature').value);
    const inunit = document.getElementById('inunit').value;
    const outunit = document.getElementById('outunit').value;
    let result;

    if (isNaN(temperatureInput)) {
        result = 'Please Enter a Valid Number!!';
    } else {
        if (inunit === outunit) {
            result = `The value is same: ${temperatureInput} ${outunit}`;
        } else {
            if (inunit === '°C') {
                // Convert Celsius to Fahrenheit
                if (outunit === '°F') {
                    result = (temperatureInput * 9/5) + 32;
                    if (result > 99.5) {
                        result = result.toFixed(2) + ' °F 🌡🔥';
                    } else if (result > 96) {
                        result = result.toFixed(2) + ' °F 🌡🌝';
                    } else {
                        result = result.toFixed(2) + ' °F 🌡️❄️';
                    }
                }
            } else {
                // Convert Fahrenheit to Celsius
                if (outunit === '°C') {
                    result = (temperatureInput - 32) * 5/9;
                    if (result > 37.5) {
                        result = result.toFixed(2) + ' °C 🌡🔥';
                    } else if (result > 35.5) {
                        result = result.toFixed(2) + ' °C 🌡🌝';
                    } else {
                        result = result.toFixed(2) + ' °C 🌡️❄️';
                    }
                }
            }
        }
    }
    document.getElementById('result').innerText = `Converted Temperature: ${result}`;
}
