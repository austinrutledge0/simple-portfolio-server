const buildIssKmlTemplate = (issCoordinates) => {
    let kml = '';
    kml += '<?xml version="1.0" encoding="UTF-8"?>'
    kml += '<kml xmlns="http://earth.google.com/kml/2.0">'
    kml += '<Document>'
    kml += getIssKmlStyles()
    console.log(issCoordinates)
    if(Array.isArray(issCoordinates))
    {

        issCoordinates.forEach((coordinate, i) => {
            let styleUrl = '#dotIcon'
            if(i === issCoordinates.length - 1)
            {
                styleUrl = '#satelliteIcon'
            }

                kml += `<Placemark>
                <styleUrl>${styleUrl}</styleUrl>
                <name>${coordinate.lng}, ${coordinate.lat}</name>
                <description>${coordinate.lng}, ${coordinate.lat}</description>
                <LookAt>
                    <longitude>${coordinate.lng}</longitude>
                    <latitude>${coordinate.lat}</latitude>
                    <range>440.8</range>
                    <tilt>8.3</tilt>
                    <heading>2.7</heading>
                </LookAt>
                <Point>
                    <coordinates>
                        ${coordinate.lng}, ${coordinate.lat}, ${(Number(coordinate.altitude) / 0.00062137)}.
                    </coordinates>
                    <altitudeMode>relativeToGround</altitudeMode>
                    <extrude>1</extrude>
                </Point>
            </Placemark>`
        })
    }
    kml += '</Document>'
    kml += '</kml>'
    return kml;
}

var getIssKmlStyles = () => {
    return `<Style id="dotIcon"> 
        <IconStyle>
            <Icon>
                <href>files/dotIcon.svg</href>
                 <scale>1</scale>
            </Icon>
        </IconStyle>
    </Style>
     <Style id="satelliteIcon"> 
        <IconStyle>
            <Icon>
                <href>files/satelliteIcon.svg</href>
                   <scale>1</scale>
            </Icon>
        </IconStyle>
    </Style>`;
}

module.exports = {
    buildIssKmlTemplate
};