import { JumpFm } from 'jumpfm-api'

import * as weather from 'weather-js'

interface CurrentWeather {
    temperature: number
    skycode: number
    skytext: string
    date: string
    observationtime: string
    observationpoint: string
    feelslike: number
    humidity: number
    winddisplay: string
    day: string
    shortday: string
    windspeed: string
    imageUrl: string
}

export function load(jumpFm) {
    function update() {
        weather.find({
            search: jumpFm.settings.getStr('weatherLocation', 'Haifa, IL'),
            degreeType: 'C'
        },
            (err, res) => {
                if (err) {
                    console.log(err)
                    return
                }

                const cur = res[0].current as CurrentWeather
                const temp = cur.temperature
                const cls =
                    temp < 25 ? 'info' : (
                        temp < 35 ? 'warn' :
                            'err'
                    )

                const txt = `${cur.temperature}° ${cur.humidity}% ${cur.windspeed.replace(/ /g, '')}`
                jumpFm.statusBar.msg([cls])(
                    'weather', {
                        txt: txt
                    }
                )
            })
    }

    update()
    setInterval(update, 36000)
}