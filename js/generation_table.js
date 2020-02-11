var airport = {"EDDN": "Нюрнберг",
               "LIPO": "Бресия",
               "LKPR": "Прага",
               "LOWS": "Зальцбург",
               "EHAM": "Амстердам",
               "EDDS": "Штуттгард",
               "LFXA": "Амберьё-ан",
               "EDDT": "Берлин",
               "EBBR": "Брюссель",
               "EDDF": "Франкфурт-на-Майне"};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fixMinutes(minutes) {
    if(minutes < 10) minutes = "0" + minutes;
    return minutes;
}

function getFields (elem) {
    let departureTime = new Date(elem.firstSeen * 1000).getHours() + ":" + fixMinutes(new Date(elem.firstSeen * 1000).getMinutes());
    let arrivalTime = new Date(elem.lastSeen * 1000).getHours() + ":" + fixMinutes(new Date(elem.lastSeen * 1000).getMinutes());

    let delayed = getRandomInt(0, 100) > 80 ? true : false; 
    return {
        "fromCity": airport[elem.estDepartureAirport],
        "toCity": airport[elem.estArrivalAirport],
        "number": elem.callsign,
        "fromTime": departureTime,
        "toTime": arrivalTime,
        "delayed": delayed
    }
}

function createTD (content) {
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(content));
    return td;
}

function generateHtmlTable(data, type) {
    data = data.filter(_ => _.estDepartureAirport != null && _.estArrivalAirport != null &&
           _.estDepartureAirport != _.estArrivalAirport && _.callsign != null)

    if (type === "arrive") {
        data = data.filter( _ =>  _.estArrivalAirport === 'EDDF');
    } else if (type === "departure") {
        data = data.filter( _ =>  _.estDepartureAirport === 'EDDF');
    } else {
        data = data.filter( _ =>  _.estDepartureAirport === 'EDDF' || _.estArrivalAirport === 'EDDF')
    }


    var table = document.getElementById('tbody');
    var p = document.getElementById('wait');
    p.style.display="none";
    
    let strings = [];
    data.forEach( _ => {
        let fields = getFields(_);

        let tr = document.createElement("tr");

        if (type === "arrive") {
            tr.appendChild(createTD(fields["toTime"]));
            tr.appendChild(createTD(fields["fromCity"]));
            tr.appendChild(createTD(fields["number"]));
            table.appendChild(tr);
        } else if (type === "departure") {
            tr.appendChild(createTD(fields["fromTime"]));
            tr.appendChild(createTD(fields["toCity"]));
            tr.appendChild(createTD(fields["number"]));
            tr.appendChild(createTD(fields["toTime"]));
            table.appendChild(tr);
        } else {
            if(fields["delayed"]) {
                tr.appendChild(createTD(fields["fromTime"]));
                tr.appendChild(createTD(fields["fromCity"]));
                tr.appendChild(createTD(fields["toCity"]));
                tr.appendChild(createTD(fields["number"]));
                tr.appendChild(createTD(fields["toTime"]));
                var lastTD = createTD("Задержан");
                lastTD.classList.add('status');
                tr.appendChild(lastTD);

                table.appendChild(tr);
            }
        }
    });
}