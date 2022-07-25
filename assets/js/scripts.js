$(document).ready(function(){

    $("form").submit(function(event){

        event.preventDefault()

        var heroID = $("#superHeroInput").val();

        $.ajax({
                    type: 'GET',
                    url: `https://www.superheroapi.com/api.php/4905856019427443/${heroID}`,
                    dataType: 'json',
                    success:function(data){
                        window.console.log(data);
                        if (data.response == 'error'){
                            $('#heroImg').html(``);
                            $('#superHeroInfo').html(`
                                <h5 class="card-title">ERROR</h5>
                                <p class="card-text">ID de personaje no existe.</p>
                            `);
                            return;
                        }
                    
                        $('#heroImg').html(`<img class="text-left img-fluid border" src="${data.image.url}" />`);

                        $('#superHeroInfo').html(`
                            <h5 class="card-title">Nombre: ${data.name}</h5>
                            <p class="card-text">Conexiones: ${data.connections["group-affiliation"]}</p>
                            <p class="card-text">Ocupacion: ${data.work.occupation}</p>
                            <p class="card-text">Primera aparicion: ${data.biography["first-appearance"]}</p>
                            <p class="card-text">Altura: ${data.appearance.height}</p>
                            <p class="card-text">Peso: ${data.appearance.weight}</p>
                        `);

                        let laInteligencia = data['powerstats']['intelligence']== 'null' ? 0 : parseInt(data['powerstats']['intelligence']);
                        let laFuerza = data['powerstats']['strength'] == 'null' ? 0 : parseInt(data['powerstats']['strength']);
                        let laVelocidad = data['powerstats']['speed'] == 'null' ? 0 : parseInt(data['powerstats']['speed']);
                        let laDureza = data['powerstats']['durability']== 'null' ? 0 : parseInt(data['powerstats']['intelligence']);
                        let laPotencia = data['powerstats']['power'] == 'null' ? 0 : parseInt(data['powerstats']['strength']);
                        let elCombate = data['powerstats']['combat'] == 'null' ? 0 : parseInt(data['powerstats']['speed']);

                        var chart = new CanvasJS.Chart("chartContainer", {
                                theme: "light2", // "light1", "light2", "dark1", "dark2"
                                exportEnabled: true,
                                animationEnabled: true,
                                title: {
                                    text: "Estadisticas de poder para tu SuperHero"
                                },
                                data: [{
                                    type: "pie",
                                    startAngle: 25,
                                    toolTipContent: "<b>{label}</b>: {y}%",
                                    showInLegend: "true",
                                    legendText: "{label}",
                                    indexLabelFontSize: 16,
                                    indexLabel: "{label} - {y}%",
                                    dataPoints: [
                                        { y: laInteligencia, label: "Inteligencia" },
                                        { y: laFuerza, label: "Fuerza" },
                                        { y: laVelocidad, label: "Velocidad" },
                                        { y: laDureza, label: "Dureza" },
                                        { y: laPotencia, label: "Potencia" },
                                        { y: elCombate, label: "Combate" },
                                        
                                    ]
                                }]
                        });
                        chart.render();
                    }
                },
        );  
    
    });

});



