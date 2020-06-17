//$(document).ready(function(){

//detenerJS();


//var cat=-1;
var lugr = -1;
var subcat = -1;
var pageven = 1;
var limpiatime = 0;
var starttimer = false;
var timercupotabla = false;
var timerprop = false;

console.log('cargo js');

function detenerJS() {
    if (timercupotabla) { clearInterval(timercupotabla); }
    if (timerprop) { clearInterval(timerprop); }

    function FatalError() {
        Error.apply(this, arguments);
        this.name = "Ejecución Detenida Exitosamente";
    }
    FatalError.prototype = Object.create(Error.prototype);

    // and then, use this to trigger the error:
    throw new FatalError("Hilo principal detenido");
}

function FN(n) {
    var t = [];
    var p = 2;
    var ts = '.';
    var dp = ',';

    // Get arguments, set defaults
    if (typeof p == 'undefined') p = 2;
    if (typeof ts == 'undefined') ts = ',';
    if (typeof dp == 'undefined') dp = '.';

    // Get number and decimal part of n
    n = Number(n).toFixed(p).split('.');

    // Add thousands separator and decimal point (if requied):
    for (var iLen = n[0].length, i = iLen ? iLen % 3 || 3 : 0, j = 0; i <= iLen; i += 3) {
        t.push(n[0].substring(j, i));
        j = i;
    }

    // Insert separators and return result
    var a = t.join(ts) + (n[1] ? dp + n[1] : '');
    a = a.toString();

    return a;
}

function DN(n) {
    n = n.toString();
    n = n.replace(/\./g, '').replace(/,/, '.');
    n = parseFloat(n);
    return n;
}

$("#iniciar_sesion").click(function (event) {
    event.preventDefault();

    if ($("#nombre_usuario").val() == "") {
        $("#nombre_usuario").val('');
        $("#contrasena").val('');
        mens_proc_open("El Usuario es requerido!!");
        return false;
    }

    if ($("#contrasena").val() == "") {
        $("#nombre_usuario").val('');
        $("#contrasena").val('');
        mens_proc_open("La Clave es requerida!!");
        return false;
    }

    mens_proc_open("");

    $.post(caminotmp + "/cprincipal/login", {
        "vusuario": $("#nombre_usuario").val(),
        "vcontrasena": $("#contrasena").val(),
        "ventra": 0
    },
        function (data) {

            if (data == -4) {
                mostrarreenviarcorreo();
                mens_proc_close();
                return false;
            }

            if (data == -1) {
                $("#nombre_usuario").val('');
                $("#contrasena").val('');
                mens_proc_open("Usuario no Registrado!!!");
                return false;
            }

            if (data == -2) {
                $("#nombre_usuario").val('');
                $("#contrasena").val('');
                mens_proc_open("Clave de acceso Invalida!!!");
                return false;
            }

            if (data == -3) {
                mens_proc_open("El Usuario esta inactivo!!!");
                $("#nombre_usuario").val('');
                $("#contrasena").val('');
                return false;
            }
            if (data == -6) {
                mens_proc_open("Estimado Usuario Usted a Superado la Cantidad de intetos fallidos, su usuario a sido bloqueado temporalmente, por su seguridad!!!");
                $("#nombre_usuario").val('');
                $("#contrasena").val('');
                return false;

            }
            if (data == -7) {
                mens_proc_open("Estimado Usuario Usted esta bloqueado!!!");
                $("#nombre_usuario").val('');
                $("#contrasena").val('');
                return false;

            }

            if (data == -5) {
                mens_proc_open("Estimado Usuario usted ya tiene una conexion abierta en otro equipo!!!");
                $("#nombre_usuario").val('');
                $("#contrasena").val('');
                return false;
            }

            clearInterval(sliderinter);

            $('body').html(data);

            mens_proc_close();
            ir_areacategorias();
            ir_areaeventos(-1, -1, -1, -1, -1, 1);
            ir_areasocial(-1);

            return true;
        }

    )
    return false;
})

function mens_proc_open(mensaje) {
    if (mensaje != "") {
        $('#botok').show();
        $("#mymodal").show();
        $("#mycontenido").html(mensaje);
    } else {
        $("#mymodal").show();
        $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
        $("#mycontenido").attr("style", "text-align:center;")
    }

}

function mens_proc_close() {
    $("#mymodal").hide();
}

$("#categobus").change(function () {
    $('#idpropocasaprin').html('');

    $.post(caminotmp + "/cprincipal/indexmenu", {
        "vusuariox": 0
    },
        function (data) {

            $('#idpropocasaprin').html(data);
        }
    )
})

// -- FUNCION DE INCIO DEL SISTEMAS
function iniciar_sesion0() {

    if ($("#nombre_usuario").val() == "")
        return false;

    if ($("#contrasena").val() == "")
        return false;

    $.post(caminotmp + "/cprincipal/index", {
        "vusuario": $("#nombre_usuario").val(),
        "vcontrasena": $("#contrasena").val(),
        "ventra": 0
    },
        function (data) {

            if (data == -1) {
                alert("Usuario no Registrado!!!");
                return false;
            }
            if (data == -2) {
                alert("Clave de acceso Invalida!!!");
                return false;

            }
            if (data == -3) {
                alert("Estimado Usuario Usted a Superado la Cantidad de intetos fallidos su usuario a sido bloqueado temporalmente, por su seguridad!!!");
                return false;

            }
            $("#top").html(data).fadeIn('slow');
        }
    )
    return false;
}

function consultar_apuestaactivas(mensaje) {
    /*  $("#mycontenido11").html(mensaje);
    $("#myapuestasact1").show();*/
    //alert(idcl);
    //alert("rrr");
    $('#eventosxxx').html('');
    $.post(caminotmp + "/cprincipal/cargarapuestascerradas", {
        "vidcl": 0,
        "vlimiteinferior": 0,
        "vpaginamiapuestas": 0
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error0")
            }
        }
    )
}

// inicio apuestas de altas y bajas
function ir_altasbajas(idvento, claseelemento, saldo, depositos) {
    var retdepositos = parseFloat(depositos);
    var retsaldo = parseFloat(saldo);

    if (retsaldo <= 0) {

        $("#mycontenidosinsaldo").html("");
        $("#mycontenidosinsaldo").html("Estimado Cliente su saldo es insuficiente para apostar!!!");
        $("#modal_sinsaldo").show();
        return false;
    }

    $('#eventosxxx').html('');
    $.post(caminotmp + "/apostar/Capostarlogros/cargaDatosAtasbajas", {
        "vidvento": idvento,
        "vclaseelemento": claseelemento,
        "vpagina": mipagina,
        "vcategoria": micat,
        "vsubcategoria": misubcat,
        "vlugar": milugar

    },
        function (data) {
            if (data) {
                $('#eventosxxx').html(data);
            } else {
                alert("error")
            }

        }
    )
}

function abrir_modal_apostar_altasybajas(idevento, propoid, clase) {
    var mimon = DN($("#mimontoaltabaja").val());
    var milogro = DN($("#milogroaltabaja").val());
    var mimontot = 0;
    mimon = parseFloat(mimon);
    milogro = parseFloat(milogro);
    if (milogro < 0) { milogro = milogro * -1; }
    if (DN($("#mimontoaltabaja").val()) <= 0) {
        $("#errlogro").html("monto debe ser mayor que cero!!!");
        $("#errlogro").show();
        return false;
    }

    if ($('#mimontoaltabaja').val() == '' || $('#mimontoaltabaja').val() == ',') {
        $("#errlogro").html("El monto es requerido!!");
        $("#errlogro").show();
        return false;
    }

    if (solounacoma($('#mimontoaltabaja').val()) > 1 || $('#mimontoaltabaja').val() == "'") {
        $("#errlogro").html("El formato del monto es inavlido!!");
        $("#errlogro").show();
        return false;
    }

    if ($("#mioperacionaltabaja").html() == '/') {
        mimontot = (mimon / (milogro / 100));
    }

    if ($("#mioperacionaltabaja").html() == 'X') {
        mimontot = (mimon) * (milogro / 100);
    }

    $("#mycontenido").html('<p>Su apuesta es de Bs: ' + FN(mimon) + " Para Ganar Bs: " + FN(mimontot) + '<p>');
    var metodo = "modal_apostar_altasbajas";
    $('#botonera').html("");
    $("#botonera").html("<div id='botok' class='modalb'  onclick='apostar_altasybajas(" + propoid + "," + idevento + "," + mimon + ",&apos;" + clase + "&apos;);'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $('#modal_apostar_altasbajas').show();
}

function apostar_altasybajas(propuesta, evento, monto, clase) {
    $("#mycontenido").attr("style", "text-align:center;")
    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');

    $.post(caminotmp + "/cprincipal/crearpropuestacasaaltabaja", {
        "vidpropuesta": propuesta,
        "videvento": evento,
        "vmonto": monto,
        "valtabaja": clase
    },
        function (data) {
            if (data) {

                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_altasbajas').show();
                    return false;
                }

                if (data == 89) {
                    $("#mycontenido").html("El evento no esta disponible para Apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_altasbajas').show();
                    return false;
                }


                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_altasbajas').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido").html("Su saldo es insuficiente para apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_altasbajas').show();
                    return false;
                }

                $('#botonera').html("");
                $("#mycontenido").html("Su apuesta ha sido registrada!!!");
                $("#botonera").html("<div id='botcan' class='modalb' onclick='finaliza_altasbajas(" + evento + ",&apos;" + clase + "&apos;);'>Ok</div>");
                $('#modal_apostar_altasbajas').show();

            } else {
                alert("error")
            }
        })
}

function finaliza_altasbajas(evento, clasepar) {
    $('#modal_apostar_altasbajas').hide();
    $('#eventosxxx').html('');
    $.post(caminotmp + "/apostar/Capostarlogros/cargaDatosAtasbajas", {
        "vidvento": evento,
        "vclaseelemento": clasepar
    },
        function (data) {
            if (data) {
                $('#eventosxxx').html(data);
            } else {
                alert("error")
            }
        }
    )
    inferior = 0;
    ir_areasocial(idclx);
}

$("#mimontoaltabaja").blur(function () {
    var mimon = DN($("#mimontoaltabaja").val());
    var milogro = DN($("#milogroaltabaja").val());
    var mimontot = 0;
    mimon = parseFloat(mimon);
    milogro = parseFloat(milogro);

    if (DN($("#mimontoaltabaja").val()) <= 0) {
        $("#errlogro").html("monto debe ser mayor quecero");
        $('#errlogro').show();
    }

    if ($("#mioperacionaltabaja").html() == '/') {
        mimontot = (mimon / ((milogro * -1) / 100));
    }

    if ($("#mioperacionaltabaja").html() == 'X') {
        mimontot = (mimon) * (milogro / 100);
    }

    $("#migananciaaltabaja").val(FN(mimontot));
});

$("#mimontoaltabaja").keypress(function (event) {
    return solo_numerosdecimales(event);
});

// fin apuestas de altas y bajas

// inicio apuestas de logros
function ir_logrosdeportivos(idvento, claseelemento, elemento, depositos, saldo) {
    var retdepositos = parseFloat(depositos);
    var retsaldo = parseFloat(saldo);

    if (retsaldo <= 0) {

        $("#mycontenidosinsaldo").html("");
        $("#mycontenidosinsaldo").html("Estimado Cliente su saldo es insuficiente para apostar!!!");
        $("#modal_sinsaldo").show();
        return false;
    }

    $('#eventosxxx').html('');
    $.post(caminotmp + "/apostar/Capostarlogros/cargaDatos", {
        "vidvento": idvento,
        "vclaseelemento": claseelemento,
        "vpagina": mipagina,
        "vcategoria": micat,
        "vsubcategoria": misubcat,
        "vlugar": milugar

    },
        function (data) {
            if (data) {
                $('#eventosxxx').html(data);
            } else {
                alert("error")
            }
        }
    )
}

function abrir_modal_apostar_logros(idvento, miparticipante, propoid, casaparticipante, clasepar) {
    var mimon = DN($("#mimonto").val());
    var milogro = DN($("#milogro").val());
    var mimontot = 0;

    mimon = parseFloat(mimon);
    milogro = parseFloat(milogro);

    if (DN($("#mimonto").val()) <= 0) {
        $("#errlogro").html("monto debe ser mayor que cero!!!");
        $("#errlogro").show();
        return false;
    }

    if ($('#mimonto').val() == '') {
        $("#errlogro").html("El monto es requerido!!");
        $("#errlogro").show();
        return false;
    }

    if (solounacoma($('#mimonto').val()) > 1 || $('#mimonto').val() == "'") {
        $("#errlogro").html("El formato del monto es inavlido!!");
        $("#errlogro").show();
        return false;
    }

    if ($("#mioperacion").html() == '/') {
        mimontot = (mimon / ((milogro * -1) / 100));
    }

    if ($("#mioperacion").html() == 'X') {
        mimontot = (mimon) * (milogro / 100);
    }

    $("#mycontenido").html('<p>Su apuesta es de Bs: ' + FN(mimon) + " Para Ganar Bs: " + FN(mimontot) + '<p>');

    var metodo = "modal_apostar_logrosdep";

    $('#botonera').html("");
    $("#botonera").html("<div id='botok' class='modalb'  onclick='apostar_logros(" + propoid + "," + idvento + "," + miparticipante + "," + casaparticipante + "," + mimon + ",&apos;" + clasepar + "&apos;);'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $('#modal_apostar_logrosdep').show();
}

function apostar_logros(propuesta, evento, elepostador, eleccasa, monto, clasepar) {
    $("#mycontenido").attr("style", "text-align:center;")
    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    $.post(caminotmp + "/cprincipal/crearpropuestacasa", {
        "vidpropuesta": propuesta,
        "videvento": evento,
        "velepostador": elepostador,
        "veleccasa": eleccasa,
        "vmonto": monto
    },
        function (data) {
            if (data) {

                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_logrosdep').show();
                    return false;
                }

                if (data == 89) {
                    $("#mycontenido").html("El evento no esta disponible para Apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_logrosdep').show();
                    return false;
                }

                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_logrosdep').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido").html("Su saldo es insuficiente para apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_logrosdep').show();
                    return false;
                }

                $("#mycontenido").html('Su Apuesta ha sido registrada!!!');
                $("#botonera").html("<div id='botcan' class='modalb' onclick='finaliza_logrosdep(" + evento + ",&apos;" + clasepar + "&apos;);'>Ok</div>");
                $('#modal_apostar_logrosdep').show();
            } else {
                alert("error");
            }
        }
    )
}

function finaliza_logrosdep(idvento, claseelemento) {
    var metodo = "modal_apostar_logrosdep";
    $('#modal_apostar_logrosdep').hide();
    $('#eventosxxx').html('');
    $.post(caminotmp + "/apostar/Capostarlogros/cargaDatos", {
        "vidvento": idvento,
        "vclaseelemento": claseelemento

    },
        function (data) {
            if (data) {
                $('#eventosxxx').html(data);
            } else {
                alert("error")
            }

        }

    )
    inferior = 0;
    ir_areasocial(idclx);
}

function apostar_propuestacasa(propuesta, evento, elepostador, eleccasa, monto) {
    $.post(caminotmp + "/cprincipal/crearpropuestacasa", {
        "vidpropuesta": propuesta,
        "videvento": evento,
        "velepostador": elepostador,
        "veleccasa": eleccasa,
        "vmonto": monto
    },
        function (data) {
            if (data) {
                $("#idleyenda").html(' Su Apuesta ha sido registrada!!!');
                $('#btncan1').attr("class", "btn btn-primary");
                $('#btncan1').attr("disabled", false, "class", "btn btn-primary").html(' Ok');
                $("#modal_propuestacasa").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                var cadena = data.split("#");
                $('#idsaldo1').val(cadena[1]);
                $('#idsaldo').val(cadena[2]);
                $('#idsaldo1').html('<span> ' + cadena[1] + ' </span>');
                $('#idsaldo').html('<span>' + cadena[2] + ' </span>');
                ir_areasocial(idclx);
                $('#areaeventos').html('');
                $.post(caminotmp + "/cprincipal/cargarareaeventos", {
                    "vfecha": -1,
                    "vbuscar": -1,
                    "vcategoria": -1,
                    "vlugar": -1,
                    "vsubcategoria": -1
                },
                    function (data) {
                        if (data) {
                            $("#areaeventos").html(data).fadeIn('slow');
                            $("#idleyenda").html(' Su Apuesta ha sido registrada!!!');
                            $('#btncan1').attr("class", "btn btn-primary");
                            $('#btncan1').attr("disabled", false, "class", "btn btn-primary").html(' Ok');
                            $('#modal_propuestacasa').modal('show');
                        } else {
                            alert("error")
                        }
                    }
                )

            } else {
                alert("error")
            }
        }
    )
}

$("#mimonto").click(function (e) {
    $('#errlogro').hide();
    return false;
})
$("#miganancia").click(function (e) {
    $('#errlogro').hide();
    return false;
})

$("#mimonto").blur(function () {
    var mimon = DN($("#mimonto").val());
    var milogro = DN($("#milogro").val());
    var mimontot = 0;
    mimon = parseFloat(mimon);
    milogro = parseFloat(milogro);
    if ($("#mimonto").val() <= 0) {
        $("#errlogro").html("El monto debe ser mayor que cero");
        $('#errlogro').show();
    }
    if ($("#mioperacion").html() == '/') {
        mimontot = (mimon / ((milogro * -1) / 100));
    }
    if ($("#mioperacion").html() == 'X') {
        mimontot = (mimon) * (milogro / 100);
    }
    $("#miganancia").val(FN(mimontot));
});

function selecciononombrado(elementobase, clase, descripa, descripb, logro, elemento, inputdinro, logroaltabaja, seleccionado) {
    var vmicontrol = "#" + elemento;
    var vmicontroltex = "#" + inputdinro;
    var vmiclase = "#idclase_" + elementobase;
    var vmierror = "#error_" + elementobase;
    var vidmiseleccionapuesta = "#idmiseleccionapuesta_" + elementobase;
    var miapuestades = "";

    $(vmierror).hide();

    $(vidmiseleccionapuesta).val(seleccionado);

    if (clase == 'L') {
        miapuestades = descripa + '<br> le gana  a ' + '<br>' + descripb + '<br> Logro ' + logro;
        $(vmiclase).val('L');
    }
    if (clase == 'A') {
        miapuestades = 'Apuesto a la alta del encuentro ' + descripa + '<br> contra  ' + '<br>' + descripb + '<br> Logro ' + logroaltabaja;
        $(vmiclase).val('A');
    }
    if (clase == 'B') {
        miapuestades = 'Apuesto a la baja del encuentro ' + descripa + '<br> contra  ' + '<br>' + descripb + '<br> Logro ' + logroaltabaja;
        $(vmiclase).val('B');
    }
    $(vmicontrol).html(miapuestades);
    $(vmicontroltex).focus();
}

function mi_barradeportes() {
    $('#idpropocasaprin').html('');
    $.post(caminotmp + "/cprincipal/indexmenu", {
        "vusuariox": 0
    },
        function (data) {
            $('#idpropocasaprin').html(data);
        }
    )
}

$("#palogoir").click(function () {
    $.post(caminotmp + "/cprincipal/irindex", {
        "vnada": 0
    },
        function (data) {
            if (data == -1) {
                ocultalogin(2);
                $.post(caminotmp + "/cprincipal/salirregistro", {
                    "vusuario": $("#nombre_usuario").val(),
                    "vcontrasena": $("#contrasena").val(),
                    "ventra": 0
                },
                    function (data) {
                        $("#top").html(data).fadeIn('slow');
                    }
                )
                return false;
            } else {
                ir_areaeventos('-1', '-1', '-1', '-1', '-1', 1);
                return false;
            }
        })
})

$("#iniciar_mucuenta").click(function () {
    $('#base').html('');
    $('#baseprincipal').html('');
    $.post(caminotmp + "/clientes/Cclientes/cargaDatos", {
        "vpantalla": 1
    },
        function (data) {
            if (data) {
                $("#baseprincipal").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
    return false;
})

$("#iniciar_mucuenta1").click(function () {
    $('#base').html('');
    $('#baseprincipal').html('');
    $.post(caminotmp + "/clientes/Cclientes/cargaDatos", {
        "vpantalla": 1
    },
        function (data) {
            if (data) {
                $("#baseprincipal").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
    return false;
})

$("#idmontolista").click(function (e) {
    $('#errorpruestamultiple').hide();
    return false;
})

$("#errorpruestamultiple").click(function (e) {
    $('#errorpruestamultiple').hide();
    return false;
})

$("#textareachat").keypress(function (event) {
    return enviar_con_enter(event);
});

function enviar_con_enter(e) {
    var key = window.Event ? e.which : e.keyCode
    if (key == 13) enviar_chat();
}

// FUNCIONES DE APUESTAS PROPOSICIONES MULTIPLES
function abrir_modal_prupestapuestocomprarmul(id, vidclase, comision) {
    //  alert($('#nicknameprivado').val());
    var conteosel1 = 0;
    var conteosel2 = 0;
    var conteosel3 = 0;
    var opciones = $('#jugada_t').val();
    opciones = opciones.split("-");

    if (($('#idmontolista').val() <= 0) || ($('#idmontolista').val() == '') || ($('#idmontolista').val() == undefined)) {

        var metodo = "modal_apostar_propuestamultiple";

        $('#botonera').html("");
        $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido").html('<p>El monto es requerido para realizar la apuesta<p>');
        $('#modal_apostar_propuestamultiple').show();

        return false;
    }

    $("#j1container td").each(function () {
        var str = $(this).prop("id");
        if (str != '') {
            conteosel1 = conteosel1 + 1;
        }
    });

    $("#j2container td").each(function () {
        var str = $(this).prop("id");
        if (str != '') {
            conteosel2 = conteosel2 + 1;
        }
    });

    $("#j3container td").each(function () {
        var str = $(this).prop("id");
        if (str != '') {
            conteosel3 = conteosel3 + 1;
        }
    });

    if (conteosel1 == 0) {
        $("#err0").show();
        $("#err0").html('Debe seleccionar ejemplares para la primera Selección del Jugador 1!!');
        return false;
    }

    if (conteosel2 == 0 && opciones[1] != 99) {
        $("#err0").show();
        $("#err0").html('Debe seleccionar ejemplares para el Jugador 2!!');
        return false;
    }

    if ((conteosel3 == 0) && (opciones[2] > 0)) {
        $("#err0").show();
        $("#err0").html('Debe seleccionar ejemplares para la segunda Selección del Jugador 1!!');
        return false;
    }

    if (conteosel1 < opciones[0]) {
        $("#err0").show();
        $("#err0").html('Debe seleccionar ' + opciones[0] + ' ejemplares para la primera Selección del Jugador 1!!');
        return false;
    }

    if (conteosel2 < opciones[1] && opciones[1] != 99) {
        $("#err0").show();
        $("#err0").html('Debe seleccionar ' + opciones[1] + ' ejemplares para el Jugador 2!!');
        return false;
    }

    if ((conteosel3 < opciones[2]) && (opciones[2] > 0)) {
        $("#err0").show();
        $("#err0").html('Debe seleccionar ' + opciones[2] + ' ejemplares para la segunda Selección del Jugador 1!!');
        return false;
    }
    if (solounacoma($('#idmontolista').val()) > 1 || $('#idmontolista').val() == "'") {
        $("#err0").show();
        $("#err0").html('El formato del monto es inavlido!!!!');
        return false;
    }

    if (DN($("#idmontolista").val()) <= 0) {
        $("#err0").show();
        $("#err0").html('El monto debe se mayor que cero!!');
        return false;
    }
    var base = $('#proporcionlista').val();
    var myArray = base.split('#');
    var pagopan = myArray[0];
    var ganopan = myArray[1];
    var megan0 = (DN($("#idmontolista").val()) * ganopan) / pagopan;

    var comi = (megan0 * comision) / 100;
    megan0 = megan0 - (megan0 * comision) / 100;


    var vganar = megan0; //DN($("#idmontolista").val()) - (DN($("#idmontolista").val()) * comision / 100);

    var metodo = "modal_apostar_propuestamultiple";
    $('#botonera').html("");
    if ($('#nicknameprivado').val() == '') {
        $("#botonera").html("<div id='botok' class='modalb'  onclick='apostar_propuestamultiple(" + id + "," + vidclase + ");'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    } else {
        $("#botonera").html("<div id='botok' class='modalb' style='width: 97.5%; text-align: center; margin-bottom: 21px;'  onclick='apostar_propuestamultiple(" + id + "," + vidclase + ");'>Apuesta Privada (" + $('#nicknameprivado').val() + ")</div><div id='botok' class='modalb'  onclick='apostar_propuestamultiple(" + id + "," + vidclase + ");'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    }

    try {
        bonsal = $('#idsaldobono1 span').html().replace('.', "");
        bonsal = bonsal.replace(',', ".");
        if (bonsal > 0) {
            $("#botonera").prepend(`
                <div style="float: left; padding: 3px;">
                    <input type="checkbox" value='false' id="cbox2" style="cursor: initial; display: inline-block;"><label for="cbox2">Utilizar Bono</label>
                </div>
            `);
        }
    } catch (error) { console.log('e') }

    $("#mycontenido").html('<p>Su apuesta es de Bs: ' + $("#idmontolista").val() + " Para Ganar Bs: " + FN(vganar) + '<p>');
    $('#modal_apostar_propuestamultiple').show();
    return false;
    // creamos el registro de la proposicion crearcompramultiple
}

function apostar_propuestamultiple(idevento, vidclase) {
    var privada = "";
    var vresto1 = 0;

    var usabono = $("#cbox2").is(":checked");

    if ($('#nicknameprivado').val() == '') {
        privada = "";
    } else {
        privada = $('#nicknameprivado').val()
    }

    $("#mycontenido").attr("style", "text-align:center;")
    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');

    var metodo = "modal_apostar_propuestamultiple";
    var itemsela = "";
    var itemselb = "";
    var itemsela2 = "";
    var itemselatempo = "";
    var itemsela99 = "";

    var opciones = $('#jugada_t').val();
    opciones = opciones.split("-");


    $("#ini_ejemp td").each(function () {
        var str = $(this).prop("id");
        if (str != '') {
            itemsela99 = itemsela99 + str + "#";
        }
    });

    $("#j1container td").each(function () {
        var str = $(this).prop("id");
        if (str != '') {
            itemselatempo = "";
            itemselatempo = str + "#";
            itemsela = itemsela + str + "#";
            itemsela99 = itemsela99.replace(itemselatempo, '');
        }
    });

    $("#j2container td").each(function () {
        var str = $(this).prop("id");
        if (str != '') {
            itemselb = itemselb + str + "#";
        }
    });

    $("#j3container td").each(function () {
        var str = $(this).prop("id");
        if (str != '') {
            itemsela2 = itemsela2 + str + "#";
        }
    });

    if (opciones[1] == 99) {
        itemselb = itemsela99;
        vresto1 = 1;
    }

    var base = $('#proporcionlista').val();
    var myArray = base.split('#');
    var pagopan = myArray[0];
    var ganopan = myArray[1];
    $.post(caminotmp + "/apostar/Ccreapropociones/crearcompramultiple", {
        "videvento": idevento,
        "vidclase": vidclase,
        "vitemsela": itemsela,
        "vitemselb": itemselb,
        "vitemsela2": itemsela2,
        "vidmontocompra": DN($("#idmontolista").val()),
        "vdescriplugar": $("#descriplugar").text(),
        "vpagopan": pagopan,
        "vganopan": ganopan,
        "vnicknameprivado": privada,
        "vresto1": vresto1,
        "vusabono": usabono
    },
        function (data) {

            if (data) {

                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }
                if (data == 89) {
                    $("#mycontenido").html("El evento no esta disponible para Apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }
                if (data == 92) {
                    $("#mycontenido").html("Estimado Cliente, elemento seleccionado fue retirado!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido").html("Estimado Cliente, su saldo es insuficiente para apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                $('#botonera').html("");
                $("#botonera").html("<div id='botok' class='modalb'  onclick='proretmultiple(" + idevento + "," + vidclase + ");'>OK</div>");
                $("#mycontenido").html('Su apuesta ha sido registrada!!! ');
                $('#modal_apostar_propuestamultiple').show();
            } else {
                alert("error");
            }
        }
    )
}

function proretmultiple(idevento, vidclase) {
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $('#modal_apostar_propuestamultiple').hide();
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');

    $.post(caminotmp + "/apostar/Ccreapropociones/cargaDatos", {
        "videvento": idevento,
        "vidclase": vidclase
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
                ir_areasocial(idclx);
            } else {
                alert("error")
            }
        }

    )
}

// FIN DE APUESTAS PROPOSICIONES MULTIPLES
$("#btn_retorna").click(function () {
    window.location.replace(caminotmp);
    return false;
})

function ocultalogin(acc) {
    if (acc == 1) {
        $("#contrasena").hide();
        $("#nombre_usuario").hide();
        $("#iniciar_sesion").hide();
        $("#iniciar_registro").hide();
        $("#olvido_registro").hide();
        $("#bloque_inicio_sesion").show();
    }

    if (acc == 2) {
        $("#contrasena").show();
        $("#nombre_usuario").show();
        $("#iniciar_sesion").show();
        $("#iniciar_registro").show();
        $("#olvido_registro").show();
        $("#bloque_inicio_sesion").hide();
    }

    if (acc == 3) {
        $("#contrasena").hide();
        $("#nombre_usuario").hide();
        $("#iniciar_sesion").hide();
        $("#iniciar_registro").hide();
        $("#olvido_registro").hide();
        $("#bloque_inicio_sesion").hide();
    }
}

$("#olvido_registro").click(function () {
    ocultalogin(3);
    $.post(caminotmp + "/clientes/Cclientes/recuperar_cuenta_index", {},
        function (data) {
            $("#top").html(data).fadeIn('slow');
        }
    )
    return false;
})

// iniciar_registro
$("#iniciar_registro").click(function () {
    ocultalogin(3);
    $.post(caminotmp + "/Cprincipal/cargaregistro", {
        "vusuario": 0,
        "vcontrasena": 0
    },
        function (data) {
            $("body").html(data).fadeIn('slow');
        }
    )
    return false;
})

// validaciones y  administración de registro de usuarios
$("#Ticket").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#idsugerencias").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#error0").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#text_nom1").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#text_nom2").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#ident_doc_identidad").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#idpais").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#sexo").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#localida").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#usuario").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#correocuenta").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#clave").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#claveconfir").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#anonac").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#mesnac").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#dianac").click(function (e) {
    $('#error0').hide();
    return false;
})

function crear_cliente() {

    var correo = $.trim($("#correocuenta").val());
    var correo2 = $.trim($("#correocuenta2").val());
    var vdocid = "";
    var vsexo = "";
    var vfecha = $("#anonac").val() + "-" + $("#mesnac").val() + "-" + $("#dianac").val();
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año

    if (dia < 10) dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10) mes = '0' + mes //agrega cero si el menor de 10

    var fechahoy = ano + "-" + mes + "-" + dia;
    var diff = new Date(fechahoy).getTime() - new Date(vfecha).getTime();

    $('#error0').hide(); 

    if ($.trim($("#usuario").val()) == "") {
        $('#error0').show();
        $('#error0').html('El usuario/nickname es requerido para realizar el Registro!!');
        $("#usuario").focus();
        return false;
    }

    if ($("#usuario").val().length > 25) {
        $('#error0').show();
        $('#error0').html('El usuario/nickname es demasiado largo!!');
        $("#usuario").focus();
        return false;
    }

    if ($("#usuario").val().length < 5) {
        $('#error0').show();
        $('#error0').html('El usuario/nickname es demasiado corto al menos 5 caracteres!!');
        $("#usuario").focus();
        return false;
    }

    if (!($("#usuario").val().match(/^(([a-zA-Z0-9]{1,})((_|-){0,1}([a-zA-Z0-9]+))+){0,}$/, 'g'))) {
        $('#error0').show();
        $('#error0').html('El usuario/nickname contiene caracteres inválidos; solo letras, números o "_","-"!! ejemplo: Abc0-Abc1_Abc2');
        $("#usuario").focus();
        return false;
    }

    if ($('input:radio[name=sex]:checked').val() == "female") {
        vsexo = "F";
    }

    if ($('input:radio[name=sex]:checked').val() == "male") {
        vsexo = "M";
    }

    if (vsexo == "") {
        $('#error0').show();
        $('#error0').html('El Sexo es requerido para realizar el Registro!!');
        return false;
    }

    if (!(vsexo == "M" || vsexo == "F")) {
        $('#error0').show();
        $('#error0').html('El sexo no es valido!!');
        return false;
    }

    if ($("#doc_identidad").val() == 'NONE' || $("#doc_identidad").val() == "") {
        $('#error0').show();
        $('#error0').html('El Documento de identidad es requerido!!');
        $("#doc_identidad").focus();
        return false;
    }

    if ($("#ident_doc_identidad").val() == "") {
        $('#error0').show();
        $('#error0').html('El Número De Documento de identidad es requerido!!');
        $("#ident_doc_identidad").focus();
        return false;
    }

    if (!($("#doc_identidad").val() == 'V' || $("#doc_identidad").val() == 'E' || $("#doc_identidad").val() == 'J' || $("#doc_identidad").val() == 'P')) {
        $('#error0').show();
        $('#error0').html('El Tipo de Documento de identidad es erróneo!!');
        $("#doc_identidad").focus();
        return false;
    }

    if ($("#ident_doc_identidad").val().startsWith("0")) {
        $('#error0').show();
        $('#error0').html('El Número de identidad no puede iniciar en 0!!');
        $("#ident_doc_identidad").focus();
        return false;
    }

    if (!($("#ident_doc_identidad").val().match(/^[0-9]+$/g))) {
        $('#error0').show();
        $('#error0').html('El Número de identidad solo puede contener números!!');
        $("#ident_doc_identidad").focus();
        return false;
    }

    if ($("#ident_doc_identidad").val().length > 9) {
        $('#error0').show();
        $('#error0').html('El Número de identidad es muy largo, máximo 10 números!!');
        $("#ident_doc_identidad").focus();
        return false;
    }

    if ($("#ident_doc_identidad").val().length < 5) {
        $('#error0').show();
        $('#error0').html('El Número de identidad es muy corto, mínimo 5 números!!');
        $("#ident_doc_identidad").focus();
        return false;
    }

    vdocid = $("#doc_identidad").val() + $("#ident_doc_identidad").val();

    if ($('#dianac').val() == 'NONE' && $('#mesnac').val() == 'NONE') {
        $('#error0').show();
        $('#error0').html('La Fecha de Nacimiento es requerida para realizar el Registro!!');
        $("#dianac").focus();
        return false;
    }

    if ($('#dianac').val() == 'NONE' || $('#dianac').val() == '') {
        $('#error0').show();
        $('#error0').html('El Día de Nacimiento es requerido para realizar el Registro!!');
        $("#dianac").focus();
        return false;
    }

    if (!($('#dianac').val().match(/^[0-9]+$/g))) {
        $('#error0').show();
        $('#error0').html('El Día de Nacimiento solo puede contener números!!');
        $("#dianac").focus();
        return false;
    }

    if ($('#dianac').val().length > 2) {
        $('#error0').show();
        $('#error0').html('El Día de Nacimiento es demasiado largo!!');
        $("#dianac").focus();
        return false;
    }

    if ($('#dianac').val().startsWith("0") && $('#dianac').val().endsWith("0")) {
        $('#error0').show();
        $('#error0').html('El Día de Nacimiento es erróneo!!');
        $("#dianac").focus();
        return false;
    }

    if ($('#mesnac').val() == 'NONE' || $('#mesnac').val() == '') {
        $('#error0').show();
        $('#error0').html('El Mes de Nacimiento es requerido para realizar el Registro!!');
        $("#mesnac").focus();
        return false;
    }

    if (!($('#mesnac').val().match(/^[0-9]+$/g))) {
        $('#error0').show();
        $('#error0').html('El Mes de Nacimiento solo puede contener números!!');
        $("#mesnac").focus();
        return false;
    }

    if ($('#mesnac').val().length > 2) {
        $('#error0').show();
        $('#error0').html('El Mes de Nacimiento es demasiado largo!!');
        $("#mesnac").focus();
        return false;
    }

    if ($('#mesnac').val().startsWith("0") && $('#mesnac').val().endsWith("0")) {
        $('#error0').show();
        $('#error0').html('El Mes de Nacimiento es erróneo!!');
        $("#mesnac").focus();
        return false;
    }

    if ($('#anonac').val() == 'NONE' || $('#anonac').val() == '') {
        $('#error0').show();
        $('#error0').html('El Año de Nacimiento es requerido para realizar el Registro!!');
        $("#anonac").focus();
        return false;
    }

    if (!($('#anonac').val().match(/^[0-9]+$/g))) {
        $('#error0').show();
        $('#error0').html('El Año de Nacimiento solo puede contener números!!');
        $("#anonac").focus();
        return false;
    }

    if ($('#anonac').val().length > 4) {
        $('#error0').show();
        $('#error0').html('El Año de Nacimiento es demasiado largo!!');
        $("#anonac").focus();
        return false;
    }

    if ($('#anonac').val().length < 4) {
        $('#error0').show();
        $('#error0').html('El Año de Nacimiento es demasiado corto!!');
        $("#anonac").focus();
        return false;
    }

    if ($('#anonac').val().startsWith("0")) {
        $('#error0').show();
        $('#error0').html('El Año de Nacimiento es erróneo!!');
        $("#anonac").focus();
        return false;
    }

    if ($.trim($("#text_nom1").val()) == "") {
        $('#error0').show();
        $('#error0').html('El nombre es requerido para realizar el Registro!!');
        $("#text_nom1").focus();
        return false;
    }

    if (!($("#text_nom1").val().match(/^[A-z ]+$/g))) {
        $('#error0').show();
        $('#error0').html('El nombre solo puede contener letras!!');
        $("#text_nom1").focus();
        return false;
    }

    if ($("#text_nom1").val().length > 25) {
        $('#error0').show();
        $('#error0').html('El nombre es demasiado largo máximo 25 caracteres!!');
        $("#text_nom1").focus();
        return false;
    }

    if ($("#text_nom1").val().length < 2) {
        $('#error0').show();
        $('#error0').html('El nombre es demasiado corto!!');
        $("#text_nom1").focus();
        return false;
    }

    if ($.trim($("#text_nom2").val()) == "") {
        $('#error0').show();
        $('#error0').html('El apellido es requerido para realizar el Registro!!');
        $("#text_nom2").focus();
        return false;
    }

    if (!($("#text_nom2").val().match(/^[A-z ]+$/g))) {
        $('#error0').show();
        $('#error0').html('El apellido solo puede contener letras!!');
        $("#text_nom2").focus();
        return false;
    }

    if ($("#text_nom2").val().length > 25) {
        $('#error0').show();
        $('#error0').html('El apellido es demasiado largo máximo 25 caracteres!!');
        $("#text_nom2").focus();
        return false;
    }

    if ($("#text_nom2").val().length < 2) {
        $('#error0').show();
        $('#error0').html('El apellido es demasiado corto!!');
        $("#text_nom2").focus();
        return false;
    }

    if ($("#idpais").val() == 0) {
        $('#error0').show();
        $('#error0').html('El país es requerido para realizar el Registro!!');
        $("#idpais").focus();
        return false;
    }

    if ($("#idpais").val().length > 25) {
        $('#error0').show();
        $('#error0').html('El nombre del país es demasiado largo máximo 25 caracteres!!');
        $("#idpais").focus();
        return false;
    }

    if (!($("#idpais").val().match(/^[0-9]+$/g))) {
        $('#error0').show();
        $('#error0').html('El nombre del país es erróneo!!');
        $("#idpais").focus();
        return false;
    }

    if ($.trim($("#localida").val()) == "") {
        $('#error0').show();
        $('#error0').html('La Ciudad es requerida para realizar el Registro!!');
        $("#localida").focus();
        return false;
    }

    if (!($("#localida").val().match(/^[A-z ]+$/g))) {
        $('#error0').show();
        $('#error0').html('La Ciudad solo puede contener letras!!');
        $("#localida").focus();
        return false;
    }

    if ($("#localida").val().length > 25) {
        $('#error0').show();
        $('#error0').html('El nombre de la ciudad es demasiado largo máximo 25 caracteres!!');
        $("#localida").focus();
        return false;
    }

    if ($("#tlflocal_cliente").val() == '' && $("#tlfmovil_cliente").val() == '') {
        $('#error0').show();
        $('#error0').html('Al menos 1 número teléfónico es requerido!!');
        return false;
    }
    
    if ($("#pregunta1").val() == 0) {
        $('#error0').show();
        $('#error0').html('La Primera Pregunta es requerida!!');
        $("#pregunta1").focus();
        return false;
    }

    if ($("#respuesta1").val() == "") {
        $('#error0').show();
        $('#error0').html('La Primera Respuesta es requerida!!');
        $("#respuesta1").focus();
        return false;
    }

    if ($("#pregunta2").val() == 0) {
        $('#error0').show();
        $('#error0').html('La Segunda Pregunta es requerida!!');
        $("#pregunta2").focus();
        return false;
    } 

    if ($("#respuesta2").val() == "") {
        $('#error0').show();
        $('#error0').html('La Segunda Respuesta es requerida!!');
        $("#respuesta2").focus();
        return false;
    }

    if (correo.indexOf(".") == -1 || correo.indexOf("@") == -1 || correo[0] == "@" || correo.indexOf("@") == correo.indexOf(".") - 1 || correo.indexOf("@") == correo.indexOf(".") + 1 || correo.indexOf("@") == (correo.length - 1) || correo[correo.length - 1] == ".") {
        $('#error0').show();
        $('#error0').html('Formato de Correo No Válido o Campo Vacío!!');
        $("#correocuenta").focus();
        return false;
    }

    if (correo !== correo2) {
        $('#error0').show();
        $('#error0').html('Correo de Confirmación no coincide!!!');
        $("#correocuenta2").focus();
        return false;
    }

    if ($("#clave").val() == "") {
        $('#error0').show();
        $('#error0').html('La clave del usuario es requerida para realizar el Registro!!');
        $("#clave").focus();
        return false;
    }

    if ($("#clave").val().length > 20) {
        $('#error0').show();
        $('#error0').html('La clave del usuario es demasiado larga máximo 10 caracteres!!');
        $("#clave").focus();
        return false;
    }

    if ($("#clave").val().length < 6) {
        $('#error0').show();
        $('#error0').html('La clave del usuario es demasiado corta mínimo 6 caracteres!!');
        $("#clave").focus();
        return false;
    }

    regexpass = new RegExp(/[¡¨!^&*()+|~=`{}\[\]:";'<>?,\/]|[^0-9A-z_$#.%@-]/, 'g');

    if (regexpass.test($("#clave").val())) {
        $('#error0').show();
        $('#error0').html('La Nueva Contraseña del usuario solo puede contener letras, numero y los siguientes caracteres : "_ $ # . % @ - " !!');
        $("#clave").focus();
        return false;
    }

    if ($.trim($("#claveconfir").val()) == "") {
        $('#error0').show();
        $('#error0').html('La Confirmación del usuario es requerida para realizar el Registro!!');
        $("#claveconfir").focus();
        return false;
    }

    if ($("#claveconfir").val() != $("#clave").val()) {
        $('#error0').show();
        $('#error0').html('La Confirmación de la clave del usuario no es igual a la clave!!');
        $("#claveconfir").focus();
        return false;
    }

    if ($("#terminos_condiciones").prop("checked") == false) {
        $('#error0').show();
        $('#error0').html('No se han Aceptado los Términos y Condiciones!!');
        return false;
    }

    if ($("#respuesta_captcha").val() == "") {
        $('#error0').show();
        $('#error0').html('La Respuesta no puede estar Vacía!!');
        $("#respuesta_captcha").focus();
        return false;
    }

    if ($("#respuesta_captcha").val() != $("#resultado").val()) {
        $('#error0').show();
        $('#error0').html('El Resultado no es Correcto!!');
        $("#respuesta_captcha").focus();
        return false;
    }

    var nocrea = 0;

    $.post(caminotmp + "/Cprincipal/validarnickpalabrasreservadas", { "vusernickname": $("#usuario").val() }, function (data) {

        if (data) {
            if (data == 0) {
                $('#error0').show();
                $('#error0').html('El usuario/nickname utiliza una palabra Inválida');
                $("#usuario").focus();
                nocrea = 1;

                return false;
            }
        } else { alert("error") }
    })

    var precorreo = correo.substr(0, correo.indexOf('@'));

    $.post(caminotmp + "/Cprincipal/validarnickpalabrasreservadas", { "vusernickname": precorreo }, function (data) {

        if (data) {
            if (data == 0) {
                $('#error0').show();
                $('#error0').html('El correo utiliza una palabra Inválida');
                $("#correocuenta").focus();
                nocrea = 1;

                return false;
            }
        } else { alert("error") }
    })

    // validamos si el usernickname existe validarusuarionicknameunico
    $.post(caminotmp + "/cprincipal/validarusuarionicknameunico", { "vusernickname": $("#usuario").val() }, function (data) {
        if (data) {
            if (data == 1) {
                $('#error0').show();
                $('#error0').html('El usuario/nickname ya se esta utilizando');
                $("#usuario").focus();
                nocrea = 1;
                return false;
            }
        } else { alert("error") }
    })
    // validamos si el usernickname existe validarusuarionicknameunico
    $.post(caminotmp + "/cprincipal/validarusuarionicknameunico_prospecto", { "vusernickname": $("#usuario").val() }, function (data) {
        if (data) {
            if (data == 1) {
                $('#error0').show();
                $('#error0').html('El usuario/nickname ya se esta utilizando');
                $("#usuario").focus();
                nocrea = 1;
                return false;
            }
        } else { alert("error") }
    })

    // creacion del cliente
    if (nocrea == 0) {
        $.post(caminotmp + "/cprincipal/actualizarclientes", {
            "vaccion": 0,
            "vid": 0,
            "vdocid": vdocid,
            "vprimernombre": $("#text_nom1").val(),
            "vsegundonombre": $("#text_nom2").val(),
            "vfechanacimiento": vfecha,
            "vsexo": vsexo,
            "vpais": $("#idpais").val(),
            "vlocalidad": $("#localida").val(),
            "vcorreocuenta": $("#correocuenta").val(),
            "vestado": 1,
            "vclave": $("#clave").val(),
            "vusernickname": $("#usuario").val(),
            "vpregunta1":$("#pregunta1").val(),
            "vpregunta2":$("#pregunta2").val(),
            "vrespuesta1":$("#respuesta1 ").val(),
            "vrespuesta2":$("#respuesta2").val(),
            "vtelefono":$("#tlfmovil_cliente").val()
        },
            function (data) {
                if (data) {
                    if (data == 95) {
                        $('#error0').show();
                        $('#error0').html('Cuenta de Correo electronico ya se esta utilizando');
                        $("#correocuenta").focus();
                        return false;
                    }
                    if (data == 94) {
                        $('#error0').show();
                        $('#error0').html('El Documento de Identidad Ya Esta Registrado!!!');
                        $("#ident_doc_identidad").focus();
                        return false;
                    }
                    $("body").html('');
                    $("body").html(data).fadeIn('slow');
                    return false;
                } else {
                    alert("error");
                }
            }
        )
    }
    return false;
}

// fin  validaciones y  administración deregistro de usuario

$("#iniciar_miayuda").click(function () {

    $('#areaeventos').html('');
    if (limpiatime == 1) {
        clearInterval(timer);
        limpiatime = 0;
    }
    $.post(caminotmp + "/cprincipal/cargarareamisayudas", {
        "vbuscar": 0
    },
        function (data) {
            if (data) {
                $("#areaeventos").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )

    detenerJS();
    return false;
})

$("#iniciar_micuenta").click(function () {
    if (starttimer) { clearInterval(timer); }
    if (limpiatime == 1) {
        clearInterval(timer);
        limpiatime = 0;
    }
    $('#base').html('');
    $('#baseprincipal').html('');
    $.post(caminotmp + "/clientes/Cclientes/cargaDatos", {
        "vpantalla": 1
    },
        function (data) {
            if (data) {
                $("#baseprincipal").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )

    detenerJS();
    return false;
})

$("#iniciar_miretiro").click(function (event) {
    event.preventDefault();
    if (limpiatime == 1) {
        clearInterval(timer);
        limpiatime = 0;
    }
    $('#baseprincipal').html('');
    $.post(caminotmp + "/clientes/Cclientes/cargaDatos", {
        "vpantalla": 4
    },
        function (data) {
            if (data) {
                $("#baseprincipal").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
    return false;

    detenerJS();
    return false;
})

$("#iniciar_historialAprin").click(function (event) {
    event.preventDefault();
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    if (limpiatime == 1) {
        clearInterval(timer);
        limpiatime = 0;
    }
    $.post(caminotmp + "/clientes/Cclientes/cargaDatoshistorialpanprin", {
        "vpantalla": 5
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )

    detenerJS();
    return false;
})

$("#iniciar_mideposito").click(function () {
    $('#base').html('');
    $('#baseprincipal').html('');
    if (limpiatime == 1) {
        clearInterval(timer);
        limpiatime = 0;
    }
    $.post(caminotmp + "/clientes/Cclientes/cargaDatos", {
        "vpantalla": 3
    },
        function (data) {
            if (data) {
                $("#baseprincipal").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )

    detenerJS();
    return false;
})


$("#btnretorna").click(function (e) {
     e.preventDefault(); 
    // alert('milugar='+milugar);
     ir_areaeventos('-1', '-1', cat, milugar, misubcat, mipagina);

});

function ir_areasocial(idcl) {
    $.post(caminotmp + "/cprincipal/cargarareasocial", {
        "vidcl": idcl,
        "vlimiteinferior": inferior,
        "vpaginamiapuestas": 0
    },
        function (data) {
            if (data) {
                $("#areasocial").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

function ir_puestoslista(control, idevento, buscar, saldo, depositos) {
    var retdepositos = parseFloat(depositos);
    var retsaldo = parseFloat(saldo);

    if (retsaldo <= 0) {
        $("#mycontenidosinsaldo").html("");
        $("#mycontenidosinsaldo").html("Estimado Cliente su saldo es insuficiente para apostar!!!");
        $("#modal_sinsaldo").show();
        return false;
    }

    var divretorno = "#" + control;
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/cprincipal/cargarareaeventoslista", {
        "vfecha": 0,
        "videvento": idevento,
        "vbuscar": buscar,
        "vpagina": mipagina,
        "vcategoria": micat,
        "vsubcategoria": misubcat,
        "vlugar": milugar
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

function ir_pollasquiniela(idpolla, saldo, depositos) {
    var retdepositos = parseFloat(depositos);
    var retsaldo = parseFloat(saldo);

    if (retsaldo <= 0) {
        $("#mycontenidosinsaldo").html("");
        $("#mycontenidosinsaldo").html("Estimado Cliente su saldo es insuficiente para apostar!!!");
        $("#modal_sinsaldo").show();
        return false;
    }

    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/apostar/Capostarpollas/cargaDatosQuiniela", {
        "vidpolla": idpolla
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

function ir_marca(idmarca, saldo, depositos) {
    var retdepositos = parseFloat(depositos);
    var retsaldo = parseFloat(saldo);

    if (retsaldo <= 0) {
        $("#mycontenidosinsaldo").html("");
        $("#mycontenidosinsaldo").html("Estimado Cliente su saldo es insuficiente para apostar!!!");
        $("#modal_sinsaldo").show();
        return false;
    }

    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/apostar/Capostarmarca/cargaDatos", {
        "vidmarca": idmarca,
        "vpagina": mipagina,
        "vcategoria": micat,
        "vsubcategoria": misubcat,
        "vlugar": milugar

    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

function ir_tablas(idtabla, saldo, idevento, depositos) {
    var retdepositos = parseFloat(depositos);
    var retsaldo = parseFloat(saldo);

    if (retsaldo <= 0) {

        $("#mycontenidosinsaldo").html("");
        $("#mycontenidosinsaldo").html("Estimado Cliente su saldo es insuficiente para apostar!!!");
        $("#modal_sinsaldo").show();
        return false;
    }

    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/apostar/Capostartablas/cargaDatos", {
        "vidtabla": idtabla,
        "videvento": idevento,
        "vpagina": mipagina,
        "vcategoria": micat,
        "vsubcategoria": misubcat,
        "vlugar": milugar
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

$("#fachabusmenu").change(function () {
    ir_areaeventos('-1', '-1', cat, '-1', '-1', 1);
})


function loadeventoqui(pagina) {
    $('#eventosxxxpolla').html('');

    $.post(caminotmp + "/cprincipal/cargarareaeventosPollaquiniela", {
        "vpagina": pagina,
        "vfecha": $('#fachabusmenu').val()
    },
        function (data) {
            if (data) {
                $("#eventosxxxpolla").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )

}

function loadevento(pagina) {
    ir_areaeventos('-1', '-1', micat, milugar, misubcat, pagina);
}

function ir_areaeventos(fecha, buscar, categoria, lugar, subcategoria, pagina) {
    cat = categoria;
    lugr = lugar;
    subcat = subcategoria;
    $("#idcate").val(categoria);
    $("#idsubcate").val(subcategoria);
    $("#apuestaprocasa").hide();
    $('#areaeventos').html('');
    if (limpiatime == 1) {
        clearInterval(timer);
        limpiatime = 0;
    }

    $.post(caminotmp + "/cprincipal/cargarareaeventos", {

        "vfecha": $('#fachabusmenu').val(),
        "vbuscar": buscar,
        "vcategoria": categoria,
        "vlugar": lugar,
        "vsubcategoria": subcategoria,
        "vpagina": pagina

    }, function (data) {

        if (data) {
            $("#areaeventos").html(data).fadeIn('slow');
        } else {
            alert("error");
        }

    })
}

function ir_areacategorias() {
    $('#areacate').html('');
    $.post(caminotmp + "/cprincipal/cargarareacategorias", {
        "vbuscar": 0
    },
        function (data) {
            if (data) {
                $("#areacate").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

// funcion para impedir mas de una coma en un campo numerico;
function solounacoma(mivalor) {
    var numero = mivalor.toString();
    var repeticion = 0;
    for (i = 0; i < numero.length; i++) {
        if (numero.charAt(i) == ',') {
            repeticion++;
        }
    }
    return repeticion;
}

// FUNCIONES DE APUESTAS DE MARCAS
function abrir_modal_apuestamarca(itemvar, idelementoapostable, idmarca, paga, gana, idevento, maxapuesta, minapuesta) {
    var combo = "#idcombo" + itemvar;
    var monto = "#nombreelemeto_" + itemvar;
    var error = "#error_" + itemvar;
    var errorm = "#error1_" + itemvar;
    var montoval = DN($(monto).val());

    var mtoval = parseFloat(montoval);
    var mtovalmax = parseFloat(maxapuesta);

    if (solounacoma($(monto).val()) > 1 || DN($(monto).val()) == "'") {
        $(errorm).show();
        $(error).show();
        $(error).html('¡El formato de monto es invalido!');
        return false;
    }

    if ($(monto).val() == '' || $(monto).val() == ',') {
        $(errorm).show();
        $(error).show();
        $(errorm).html('¡EL monto debe ser mayor que cero!');
        return false;
    }

    if ($(combo).val() == 0) {
        $(errorm).show();
        $(error).show();
        $(errorm).html('El contrincante es requerido');
        return false;
    }

    if (mtoval <= 0) {
        $(errorm).show();
        $(error).show();
        $(errorm).html('EL monto debe ser mayor que cero');
        return false;
    }

    if (mtoval < minapuesta) {
        $(errorm).show();
        $(error).show();
        $(errorm).html('EL monto de la apuesta debe ser mayor al minimo permitido');
        return false;
    }

    if (mtoval > mtovalmax) {
        $(errorm).show();
        $(error).show();
        $(errorm).html('EL monto de la apuesta excede el maximo permitido');
        return false;
    }

    var montoaganar = 0;

    // validar cupo de la marca
    montoaganar = (mtoval * gana) / paga;
    var metodo = "modal_clientes_apuestamarca";
    $('#botonera').html("");
    $("#botonera").html("<div id='botok' class='modalb'  onclick='apostar_marca(" + itemvar + "," + idelementoapostable + "," + idmarca + "," + paga + "," + gana + "," + idevento + "," + maxapuesta + "," + mtoval + ");'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $("#mycontenido").html('Apuesta BS: ' + FN(mtoval) + ' Para ganar BS: ' + FN(montoaganar));
    $('#modal_clientes_apuestamarca').show();
}

function apostar_marca(itemvar, idelementoapostable, idmarca, paga, gana, idevento, maxapuesta, mtoval) {
    $("#mycontenido").attr("style", "text-align:center;")
    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    var combo = "#idcombo" + itemvar;
    var monto = "#nombreelemeto_" + itemvar;
    var error = "#error_" + itemvar;
    var cupo = "#cupo" + itemvar;
    var dataret = 0;
    var montoaganar = 0;
    $("#btncanmarca").hide();

    // validar cupo de la marca
    montoaganar = (mtoval * gana) / paga;

    var dataretor = 0;
    $.post(caminotmp + "/apostar/Capostarmarca/extraercupo_marcaantesdeenviar", {
        "vidmarca": idmarca,
        "videlementocasa": idelementoapostable,
        "videlementoapostador": $(combo).val(),
        "vmontonew": mtoval
    },
        function (data) {
            if (data) {
                dataret = data;
                if (dataret < 0) {
                    $("#mycontenido").html('Esta Marca supero el cupo asigando!!!');
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='apostar_marcaconsulta(" + idmarca + ");'>OK</div>");
                    $('#modal_clientes_apuestamarca').show();
                    return false;
                }
            } else {
                alert("error a");
                return false;
            }

            if (dataret >= 0) {
                $.post(caminotmp + "/apostar/Capostarmarca/apostar_marca", {
                    "videlementocl": $(combo).val(),
                    "vmonto": DN($(monto).val()),
                    "videlementoapostablecasa": idelementoapostable,
                    "vidmarca": idmarca,
                    "vpaga": paga,
                    "vgana": gana,
                    "videvento": idevento,
                    "vdescriplugar": $('#descriplugar').text(),
                    "vpagina": mipagina
                },
                    function (data) {
                        if (data) {
                            if (data == 90) {
                                $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                                $('#botonera').html("");
                                $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                                $('#modal_clientes_apuestamarca').show();
                                return false;
                            }

                            if (data == 91) {
                                $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                                $('#botonera').html("");
                                $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                                $('#modal_clientes_apuestamarca').show();
                                return false;
                            }

                            if (data == 92) {
                                $("#mycontenido").html("Estimado Cliente, elemento seleccionado fue retirado!!!");
                                $('#botonera').html("");
                                $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                                $('#modal_clientes_apuestamarca').show();
                                return false;
                            }

                            if (data == 93) {
                                $("#mycontenido").html("Estimado Cliente, la marca de la casa seleccionado fue retirada!!!");
                                $('#botonera').html("");
                                $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                                $('#modal_clientes_apuestamarca').show();
                                return false;
                            }


                            if (data == 99) {
                                $("#mycontenido").html('Saldo insuficiente para a postar!!!');
                                $('#botonera').html("");
                                $("#botonera").html("<div id='botcan' class='modalb' onclick='apostar_marcaconsulta(" + idmarca + ");'>OK</div>");
                                $('#modal_clientes_apuestamarca').show();
                                return false;
                            }
                            if (data == 89) {
                                $("#mycontenido").html('El evento no esta disponible para Apostar!!!');
                                $('#botonera').html("");
                                $("#botonera").html("<div id='botcan' class='modalb' onclick='apostar_marcaconsulta(" + idmarca + ");'>OK</div>");
                                $('#modal_clientes_apuestamarca').show();
                                return false;
                            }

                            if (data == 96) {
                                $("#mycontenido").html('Esta Marca supero el cupo asigando!!!');
                                $('#botonera').html("");
                                $("#botonera").html("<div id='botcan' class='modalb' onclick='apostar_marcaconsulta(" + idmarca + ");'>OK</div>");
                                $('#modal_clientes_apuestamarca').show();
                                return false;
                            }

                            $("#mycontenido").html('Su apuesta ha sido registrada!!!');
                            $('#botonera').html("");
                            $("#botonera").html("<div id='botcan' class='modalb' onclick='apostar_marcaconsulta(" + idmarca + ");'>OK</div>");
                            $('#modal_clientes_apuestamarca').show();

                        } else {
                            alert("error b")
                        }
                    }
                )
            }
        })
    return false;
}

function apostar_marcaconsulta(idmarca) {
    var metodo = "modal_clientes_apuestamarca";
    $('#modal_clientes_apuestamarca').hide();
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');

    $.post(caminotmp + "/apostar/Capostarmarca/cargaDatos", {
        "vidmarca": idmarca,
        "vpagina": mipagina
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
    inferior = 0;
    ir_areasocial(idclx);
}

/*FUNCION DE APUESTA DE TABLAS */
function ir_refrecarcupotablas(idtabla, cupo) {

    $.post(caminotmp + "/apostar/Capostartablas/consultar_cupo_tabla", {
        "vidtabla": idtabla,
        "vcupogeneral": cupo
    },
        function (data) {
            if (data) {
                var contar = 0;
                var valoresres = data.split("#");
                $('#mitabla label').each(function () {
                    var str = $(this).prop("id");
                    var res = str.substring(0, 14);
                    var totalres = valoresres.length;

                    if (res == 'cupoitemtabla_') {
                        contar = contar + 1;
                        var milabel = '#' + 'cupoitemtabla_' + contar;
                        $(milabel).html(valoresres[contar - 1]);
                    }
                });

            } else {
                alert("error");
            }
        }
    )
    return false;
}

function abrir_modal_apuestatabla(itemvar, idtabla, idelementoapostable, idevento, premio) {
    var totalmonto = "#totalmonto_" + itemvar;
    var nrotabla = "#numerostabla_" + itemvar;
    var error = "#error_" + itemvar;
    var trerror = "#trerror_" + itemvar;

    if ($(nrotabla).val() <= 0) {
        $(trerror).show();
        $(error).show();
        $(error).html('La cantidad de tablas es requerido');
        return false;
    }

    console.log(DN($(totalmonto).val()));

    console.log($('#hdmxlg').val());

    if (DN($(totalmonto).val()) > $('#hdmxlg').val()) {
        $(trerror).show();
        $(error).show();
        $(error).html('El monto de apuesta supera el maximo permitido');
        return false;
    }
    var cantt = $(nrotabla).val();
    var premipant = parseFloat(premio) * parseFloat(cantt);
    var metodo = "modal_clientes_apuestatabla";
    $('#botonera').html("");
    $("#botonera").html("<div id='botok' class='modalb' onclick='apostar_tabla(" + itemvar + "," + idtabla + "," + idelementoapostable + "," + idevento + ");'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $("#mycontenido").html('<p>Su apuesta es de Bs: ' + $(totalmonto).val() + ' Para Ganar Bs: ' + FN(premipant) + '<p>');
    $('#modal_clientes_apuestatabla').show();
}

function apostar_tabla(itemvar, idtabla, idelementoapostable, idevento) {
    $("#mycontenido").attr("style", "text-align:center;")
    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    var totalmonto = "#totalmonto_" + itemvar;
    var nrotabla = "#numerostabla_" + itemvar;
    var error = "#error_" + itemvar;
    var trerror = "#trerror_" + itemvar;
    var miprecio = DN($(totalmonto).val()) / DN($(nrotabla).val());
    $("#btncantablas").hide();
    $.post(caminotmp + "/apostar/Capostartablas/apostar_tabla", {
        "vidtabla": idtabla,
        "videvento": idevento,
        "vmonto": miprecio,
        "videlementoapostable": idelementoapostable,
        "vnrotabla": DN($(nrotabla).val()),
        "vdescriplugar": $('#descriplugar').text(),
        "vpagina": mipagina
    },
        function (data) {
            if (data) {
                //alert(data);
                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestatabla').show();
                    return false;
                }

                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestatabla').show();
                    return false;
                }

                if (data == 92) {
                    $("#mycontenido").html("Estimado Cliente, El ejemplar seleccionado Esta Retirado, No es posible aceptar la apuesta!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestatabla').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido").html('Disculpe Tabla cerrada para apuestas!!!');
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='apostar_tablaconsulta(" + itemvar + "," + idtabla + "," + idelementoapostable + "," + idevento + ");'>OK</div>");
                    $('#modal_clientes_apuestatabla').show();
                    return false;
                }

                if (data == 98) {
                    $("#mycontenido").html('Disculpe La cantidad Supera el cupo disponible !!!');
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='apostar_tablaconsulta(" + itemvar + "," + idtabla + "," + idelementoapostable + "," + idevento + ");'>OK</div>");
                    $('#modal_clientes_apuestatabla').show();
                    return false;
                }

                if (data == 97) {
                    $("#mycontenido").html('Saldo insuficiente Para Apostar!!!');
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='apostar_tablaconsulta(" + itemvar + "," + idtabla + "," + idelementoapostable + "," + idevento + ");'>OK</div>");
                    $('#modal_clientes_apuestatabla').show();
                    return false;
                }

                $("#mycontenido").html('Su apuesta ha sido registrada!!!');
                $('#botonera').html("");
                $("#botonera").html("<div id='botcan' class='modalb' onclick='apostar_tablaconsulta(" + itemvar + "," + idtabla + "," + idelementoapostable + "," + idevento + ");'>OK</div>");
                $('#modal_clientes_apuestatabla').show();

            } else {
                alert("error")
            }
        }
    )
}

function apostar_tablaconsulta(itemvar, idtabla, idelementoapostable, idevento) {
    $('#modal_clientes_apuestatabla').hide();
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/apostar/Capostartablas/cargaDatos", {
        "vidtabla": idtabla,
        "videvento": idevento,
        "vpagina": mipagina

    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data);
            } else {
                alert("error")
            }
        })
    inferior = 0;
    ir_areasocial(idclx);

}

/*FIN FUNCION DE APUESTA DE TABALAS */
$('#error00').click(function (e) {
    $('#error00').hide();
    return false;
});

$('#monto').click(function (e) {
    $('#error00').hide();
    return false;
});

$("#monto").keypress(function (event) {
    return solo_numerosenteros(event);
});

$("#Ticket").keypress(function (event) {
    return solo_numerosenteros(event);
});

function ir_puestos(idpuesto) {
    if ($('#idsaldo').val() <= 0) {
        alert("Lo sentimos pero usted no tiene fondos disponibles en estos momentos");
        return false;
    }
    $('#areatrabajo').html('');
    $.post(caminotmp + "/apostar/Capostarpuestos/cargaDatos", {
        "vidpuesto": idpuesto
    },
        function (data) {
            if (data) {
                $("#areatrabajo").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

function ir_comprapuestoslista(idevento, idlemento, linea, col, col2, favcontra, comision) {
  //  alert(favcontra);
    recargar = 1;
    vcol = "#" + col;
    vlinea = "#" + linea;
    vcol0 = "#" + col2 + "0";
    vcol1 = "#" + col2 + "1";
    vcol2 = "#" + col2 + "2";
    vcol3 = "#" + col2 + "3";
    vcol4 = "#" + col2 + "4";
    vcol5 = "#" + col2 + "5";
    vcol6 = "#" + col2 + "6";
    vcol7 = "#" + col2 + "7";
    vcol8 = "#" + col2 + "8";
    vcol9 = "#" + col2 + "9";

    $("#tablaopciones tr td").css("background-color", "");
    $(this).parent("td").css("background-color", "red");

    $(vcol2).css("background-color", "#ffcb18");
    $(vcol3).css("background-color", "#ffcb18");
    $(vcol4).css("background-color", "#ffcb18");
    $(vcol5).css("background-color", "#ffcb18");
    $(vcol6).css("background-color", "#ffcb18");
    $(vcol7).css("background-color", "#ffcb18");
    $(vcol8).css("background-color", "#ffcb18");
    $(vcol9).css("background-color", "#ffcb18");

    $(vcol).css("background-color", "#c19b16");
    $('#eticabecera').html('Comprar');
    $('#idlineaafavortit').show();
    $('#idlineaafavor').show();
    $('#idlineajugadatit').show();
    $('#idlineajugada').show();
    $('#idlineaproporciontit').show();
    $('#idlineaproporcion').show();
    $('#idlineacupo').hide();
    $('#etimonto').show();
    $('#etimonto2').show();
    $('#etiaccion').show();
    $('#idmontolista').focus();
    $('#idevento1').val(idevento);
    $('#idlemento1').val(idlemento);
    $('#etiguarda').show();
    $('#etiguardaven').hide();
    if (favcontra == 'f') { $('#idafavor > option[value="F"]').attr('selected', 'selected'); }
    if (favcontra == 'c') { $('#idafavor > option[value="C"]').attr('selected', 'selected'); }
    $('#etimijugadades').hide();
    $('#etimifavordes').hide();
    $('#idlineaproporciondes').hide();


}

$("#idmontolista").keypress(function (event) {
    return solo_numerosdecimales(event);
});

// creacion de la compra del puesto
// FUNCIONES DE COMPRA DE PUESTOS ---
function abrir_modal_apuestapuestocompra(id) {
    var metodo = "modal_clientes_apuestapuestocompra";
    var montoval = DN($('#idmontolista').val());
    var mtoval = parseFloat(montoval);
    $('#botonera').html("");
    if (mtoval == '' || mtoval == ',') {
        $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido").html('El monto es requerido!!11');
        $('#modal_clientes_apuestapuestocompra').show();
        return false;
    }

    if ((mtoval <= 0) || ($('#idmontolista').val() == "")) {
        $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido").html('El monto es requerido!!');
        $('#modal_clientes_apuestapuestocompra').show();
        return false;
    }

    if ((mtoval <= 0)) {
        $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido").html('El monto debe ser mayor que 0!!');
        $('#modal_clientes_apuestapuestocompra').show();
        return false;
    }

    if (solounacoma($('#idmontolista').val()) > 1 || $('#idmontolista').val() == "'") {
        $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido").html('El formato del monto es inavlido!!');
        $('#modal_clientes_apuestapuestocompra').show();
        return false;
    }
    // alert($('#idafavor').val());
    var base = $('#idproporcionapuesta').val();
    var myArray = base.split('#');
    var pagopan = myArray[1];
    var ganopan = myArray[2];
    if ($('#idafavor').val() == 'C') {
        pagopan = myArray[2];
        ganopan = myArray[1];
    }
    var megan0 = (mtoval * ganopan) / pagopan;
    var comi = (megan0 * $('#idcomision').val()) / 100;
    megan0 = megan0 - (megan0 * $('#idcomision').val()) / 100;
    $("#mycontenido").html('Apuesto BS: ' + $('#idmontolista').val() + ' Para Ganar BS: ' + FN(megan0));
    $("#botonera").html(`
        <div style="float: right;">
            <div id='botok' class='modalb' onclick='comprar_puestolista(` + $('#idevento0').val() + `);'>Confirmar Apuesta</div>
            <div id='botcan' class='modalb' onclick='ocultarmodal(` + `&#39;` + metodo + `&#39;);'>Cancelar</div>
        </div>`);

    try {
        bonsal = $('#idsaldobono1 span').html().replace('.', "");
        bonsal = bonsal.replace(',', ".");
        if (bonsal > 0) {
            $("#botonera").prepend(`
                <div style="float: left; padding: 3px;">
                    <input type="checkbox" value='false' id="cbox2" style="cursor: initial; display: inline-block;"><label for="cbox2">Utilizar Bono</label>
                </div>
            `);
        }
    } catch (error) { console.log('e') }

    $('#modal_clientes_apuestapuestocompra').show();
}

function comprar_puestolista(item) {
    $("#mycontenido").attr("style", "text-align:center;");

    var usabono = $("#cbox2").is(":checked");

    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    var metodo = "modal_clientes_apuestapuestocompra";
    var montoval = DN($('#idmontolista').val());
    var mtoval = parseFloat(montoval);

    $.post(caminotmp + "/apostar/Capostarpuestos/crearcompra", {
        "videvento1": $('#idevento0').val(),
        "vidlemento1": $('#idlemento1').val(),
        "vidmontolista": mtoval,
        "vidafavor": $('#idafavor').val(),
        "vidproporcionapuesta": $('#idproporcionapuesta').val(),
        "vidjugada": $('#idjugada').val(),
        "vdescriplugar": $('#descriplugar').text(),
        "vusabono": usabono,
        "page": mipagina,
        "vcategoria": micat,
        "vsubcategoria": misubcat,
        "vlugar": milugar
    },
        function (data) {
            if (data) {
                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapuestocompra').show();
                    return false;
                }

                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapuestocompra').show();
                    return false;
                }

                if (data == 92) {
                    $("#mycontenido").html("Estimado Cliente, elemento seleccionado fue retirado!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapuestocompra').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido").html("Saldo insuficiente para a postar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapuestocompra').show();
                    return false;
                }

                if (data == 89) {
                    $("#mycontenido").html("El evento no esta disponible para Apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapuestocompra').show();
                    return false;
                }

                $("#mycontenido").html('Su Apuesta ha sido registrada!!!');
                $("#mycontenido").html('Su Apuesta ha sido registrada!!!');
                $("#botonera").html("<div id='botcan' class='modalb' onclick='finalizar_comprapuesto(" + $('#idevento0').val() + ");'>Ok</div>");
                $('#modal_clientes_apuestapuestocompra').show();

            } else {
                alert("error");
            }
        });
}

function finalizar_comprapuesto(idevento0) {
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');

    $.post(caminotmp + "/cprincipal/cargarareaeventoslista", {
        "vfecha": 0,
        "videvento": idevento0,
        "vbuscar": '',
        "vpagina": mipagina,
        "vcategoria": micat,
        "vsubcategoria": misubcat,
        "vlugar": milugar
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }

    )
    inferior = 0;
    ir_areasocial(idclx);
}

// FIN FUNCIONES DE COMPRA DE PUESTOS ---
// function ir_apostarpuestoslista(idevento, idlemento, linea, col, col2, cupo, favorcontra, puesto, nini, paga, gana, idcompra)
function ir_apostarpuestoslista(idevento, idlemento, linea, col, col2, cupo, favorcontra, puesto, nini, paga, gana, idcompra, idmontosagrupados) {
    var favcon='';
    var p1='';
    var n1='';
    var pt='';
    var porpordes="";

    vlinea = "#" + linea;
    vcol = "#" + col;
    vcol0 = "#" + col2 + "0";
    vcol1 = "#" + col2 + "1";
    vcol2 = "#" + col2 + "2";
    vcol3 = "#" + col2 + "3";
    vcol4 = "#" + col2 + "4";
    vcol5 = "#" + col2 + "5";
    vcol6 = "#" + col2 + "6";
    vcol7 = "#" + col2 + "7";
    vcol8 = "#" + col2 + "8";
    vcol9 = "#" + col2 + "9";

    $("#tablaopciones tr td").css("background-color", "");
    $(vlinea).css("background-color", "#FFF");
    $(vcol2).css("background-color", "#ffcb18");
    $(vcol3).css("background-color", "#ffcb18");
    $(vcol4).css("background-color", "#ffcb18");
    $(vcol5).css("background-color", "#ffcb18");
    $(vcol6).css("background-color", "#ffcb18");
    $(vcol7).css("background-color", "#ffcb18");
    $(vcol8).css("background-color", "#ffcb18");
    $(vcol9).css("background-color", "#ffcb18");

    $(vcol).css("background-color", "#c19b16");
    $('#eticabecera').html('Apostar');
    $('#idlineaafavortit').hide();
    $('#idlineaafavor').hide();
    $('#idlineajugadatit').hide();
    $('#idlineajugada').hide();
    $('#idlineaproporciontit').hide();
    $('#idlineaproporcion').hide();
    $('#idlineacupo').show();
    $('#etimonto').show();
    $('#etimonto2').show();
    $('#etiaccion').show();
    $('#etiguarda').show();
    $('#etimijugadades').show();
    $('#etimifavordes').show();
    $('#idlineajugadatit').show();
    $('#etimiejemplar').show();
    $('#idlineaafavortit').show();
    $('#idlineaproporciontit').show();
    $('#idlineaproporciondes').show();

    
    if(puesto>0) { p1=puesto+'P';}
    if(nini>0) { n1=' Y ' + nini + 'N';}
    pt=p1+n1;
    
    if(favorcontra=='F'){ favcon=' Jugar '; }
    if(favorcontra=='C') { favcon=' Doy '; }
    
    porpordes=gana + ' -' + paga;
    if(gana==10 && paga==10){porpordes="Pelo a Pelo";}
    if(gana==5 || paga==5){porpordes="A la Mitad";}

    
   
    $('#etimijugadades').html(pt);
    $('#etimifavordes').html(favcon);
    $('#etimipropor').html(porpordes);

    $('#idevento1').val(idevento);
    $('#idlemento1').val(idlemento);
    $('#idcupolista').html(cupo);
    $('#idmontolista').val(cupo);
    $('#idmontolista').focus();
    $('#etiguarda').hide();
    $('#etiguardaven').show();
    $('#idevento1').val(idevento);
    $('#idlemento1').val(idlemento);
    $('#idfavcontra').val(favorcontra);
    $('#idpuestoven').val(puesto);
    $('#idniniven').val(nini);
    $('#idpagoven').val(paga);
    $('#idganoven').val(gana);
    $('#idcompra').val(idcompra);
    $('#idcompramontos').val(idmontosagrupados);
}

function enviar_chat() {
    var f = 0;

    str = $('#textareachat').val();

    str = str.trim();

    if (str == '') {
        return false;
    }

    $('#textareachat').val(str);

    $.post(caminotmp + "/apostar/Ccreapropociones/crearmensaje", {
        "vnomchat": $('#nomchat').val(),
        "vtextareachat": $('#textareachat').val(),
        "vnicknameprivado": $('#nicknameprivado').val(),
        "videventochat": $('#ideventochat').val()
    },
        function (data) {
            if (data) {
                f = 1;
                $('#textareachat').val('');
            } else {
                alert("error")
            }
        }
    )

    $('#textareachat').val('');
}

function invitar_chat(textoinvita, usrprivado) {
    var f = 0;
    $.post(caminotmp + "/apostar/Ccreapropociones/crearmensaje", {
        "vnomchat": $('#nomchat').val(),
        "vtextareachat": textoinvita,
        "vnicknameprivado": usrprivado,
        "videventochat": $('#ideventochat').val()
    },
        function (data) {
            if (data) {
                f = 1;
                $('#textareachat').val('');
            } else {
                alert("error")
            }
        }
    )

    $('#textareachat').val('');
}

function apostar_puesto(itemvar) {
    if ($('#monto').val() <= 0) {
        $('#error00').show();
        $('#error00').html('El monto a apostar es requerido');
        return false;
    }
}

function ir_comprapuestos(idpuesto) {

    $('#areatrabajo').html('');

    $.post(caminotmp + "/apostar/Capostarpuestos/cargaDatoscompra", {
        "vidpuesto": idpuesto

    },
        function (data) {
            if (data) {
                $("#areatrabajo").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }

    )
}

function ir_proposicionescrear(idevento, idclase, saldo, depositos) {
    var retdepositos = parseFloat(depositos);
    var retsaldo = parseFloat(saldo);

    if (retsaldo <= 0) {
        $("#mycontenidosinsaldo").html("");
        $("#mycontenidosinsaldo").html("Estimado Cliente su saldo es insuficiente para apostar!!!");
        $("#modal_sinsaldo").show();
        return false;
    }

    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');

    $.post(caminotmp + "/apostar/Ccreapropociones/cargaDatos", {
        "videvento": idevento,
        "vidclase": idclase
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }

    )
}

// opcion de creacio de puestos por parte de los clientes
function ir_puestoscrear(acc) {
    if ($('#idsaldo').val() <= 0) {
        alert("Lo sentimos pero usted no tiene fondos disponibles en estos momentos");
        return false;
    }
    $('#areatrabajo').html('');
    $.post(caminotmp + "/apostar/Ccreapuestos/cargaDatos", {
        "vbuscar": 0

    },
        function (data) {
            if (data) {
                $("#areatrabajo").html(data).fadeIn('slow');
                //	$('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
    carga_evento(0);
}

function carga_evento(acc) {
    $('#eventosdispocreapuesto').html('');
    $.post(caminotmp + "/apostar/Ccreapuestos/cargaDatosEventos", {
        "vbuscar": 0
    },
        function (data) {
            if (data) {
                $("#eventosdispocreapuesto").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

function sel_evento(idevento, fecha, hora, idcate) {
    crear_puestoscliente(idevento, fecha, hora, idcate);
}

function crear_puestoscliente(idevento, fecha, hora, idcate) {
    $('#creapuestocliente').html('');
    $.post(caminotmp + "/apostar/Ccreapuestos/cargaDatosPuestosclientes", {
        "videvento": idevento,
        "vfecha": fecha,
        "vhora": hora,
        "vidcate": idcate
    },
        function (data) {
            if (data) {
                $("#creapuestocliente").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

function ir_jugadaspollas(idpolla) {
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');

    $.post(caminotmp + "/apostar/Capostarpollas/consultarpollasenjuego", {
        "vidpolla": idpolla,
        "vclasepolla": "POLLA"
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}
function loadrankingpolla(pag,idpolla){
     $('#eventosxxx').html('');
     $('#eventosxxx22').html('');
         $.post(caminotmp + "/apostar/Capostarpollas/paginarconsultarpollasenjuego", {
        "vidpolla": idpolla,
        "vclasepolla": "POLLA",
        "vpagepolla":pag
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}
function ir_jugadaspollasquiniela(idpolla) {

    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/apostar/Capostarpollas/consultarpollasquinielasenjuego", {
        "vidpolla": idpolla,
        "vclasepolla": "QUINIELA"
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error");
            }
        }
    )
}

function filtrarpuestos() {
    alert("xxxx");
}

$("#idlemento").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#idproporcionapuesta").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#idjugada").click(function (e) {
    $('#error0').hide();
    return false;
})

$("#montoapuesta").click(function (e) {
    $('#error0').hide();
    return false;
})

function crearapuestaclientes(idevento, fecha, hora, idcate) {

    if ($('#idlemento').val() == 0) {
        $('#error0').show();
        $('#error0').html('El ejemplar es requerido!!');
        $("#idlemento").focus();
        return false;
    }

    if ($('#idproporcionapuesta').val() == '0#0#0') {
        $('#error0').show();
        $('#error0').html('La proporción del pago es requerida!!');
        $("#idproporcionapuesta").focus();
        return false;
    }

    if ($('#idjugada').val() == '0#0#0') {
        $('#error0').show();
        $('#error0').html('La Jugada de del Puesto es requerida!!');
        $("#idjugada").focus();
        return false;
    }

    if ($('#montoapuesta').val() < 1) {
        $('#error0').show();
        $('#error0').html('El Monto arriesgado no puede ser meno ue cero!!');
        $("#montoapuesta").focus();
        return false;
    }

    var opcion_seleccionada = $("#idlemento option:selected").text();
    $.post(caminotmp + "/apostar/Ccreapuestos/actualizarDatosPuestosclientes", {
        "vaccion": 0,
        "videvento": idevento,
        "vidcate": idcate,
        "vfecha": fecha,
        "vhora": hora,
        "videlementoapostable": $('#idlemento').val(),
        "videlementoapostabledescripcion": opcion_seleccionada,
        "vidproporcionapuesta": $('#idproporcionapuesta').val(),
        "vidjugada": $('#idjugada').val(),
        "vmontoapuesta": $('#montoapuesta').val()
    },
        function (data) {
            if (data) {
                $("#creapuestocliente").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
}

$("#iddoy").keypress(function (event) {
    return solo_numerosenteros(event);
});

$("#idmonto").keypress(function (event) {
    return solo_numerosenteros(event);
});

$("#num_cuenta").keypress(function (event) {

    return solo_numerosenteros(event);
});

$("#ident_doc_identidad").keypress(function (event) {
    return solo_numerosenteros(event);
});

$("#textmonto").keypress(function (event) {
    return solo_numerosdecimales(event);
});

function solo_numerosenterostelefonicos(e) {
    var key = window.Event ? e.which : e.keyCode

    return ((key >= 48 && key <= 57) || (key == 45) || (key == 44) || (key == 13) || (key == 8) || (key >= 37 && key <= 40) || (key == 11) || (key == 9));
}

function solo_numerosenteros(e) {
    var key = window.Event ? e.which : e.keyCode

    return ((key >= 48 && key <= 57) || (key == 44) || (key == 13) || (key == 8) || (key >= 37 && key <= 40) || (key == 11) || (key == 9));
}

function solo_numerosenterossincoma(e) {
    var key = window.Event ? e.which : e.keyCode

    return ((key >= 48 && key <= 57) || (key == 13) || (key == 8) || (key >= 37 && key <= 40) || (key == 11) || (key == 9));
}

function solo_numerosdecimales(e) {
    var key = window.Event ? e.which : e.keyCode
    return ((key >= 48 && key <= 57) || (key == 44) || (key == 13) || (key == 0) || (key == 8) || (key >= 37 && key <= 40) || (key == 11) || (key == 9));
}

function consultar_apuestapolla(idpolla) {
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');

    $.post(caminotmp + "/apostar/Capostarpollas/consultarmipolla", {
        "vidmipolla": idpolla
    },
        function (data) {
            $("#eventosxxx").html(data).fadeIn('slow');
        }
    )
}

function retira_oferta(idapuesta, clasejug, evento) {
    var metodo = "modal_retioferta";
    $("#mycontenidooferta").html("¿Por Favor Confirmar el retiro de la Oferta?");
    $('tr #botonera').html("");
    $("tr #botonera").html("<div id='botok' class='modalb'  onclick='proc_retira_oferta(" + idapuesta + ",&#39;" + clasejug + "&#39;," + evento + "); canrefreshtickets = true;'>Confirmar</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;); canrefreshtickets = true;'>Cancelar</div>");
    $('#modal_retioferta').show();
}

function proc_retira_oferta(idapuesta, clasejug, evento) {

    $.post(caminotmp + "/Cprincipal/retirar_oferta", {
        "vidapuesta": idapuesta,
        "vclasejug": clasejug,
        "vevento": evento
    },
        function (data) {
            var dar = 0;
            dar = data;

            if (data == 90) {
                $("#mycontenidooferta").html("El evento ya esta en progreso, No es posible Retirar la Apuesta!");
                $('tr #botonera').html("");
                //	$("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                $("tr #botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + "modal_retioferta" + "&#39;);'>OK</div>");
                $('#modal_retioferta').show();
                return false;
            }

            if (dar == -1) {
                $("#mycontenidooferta").html('no se puede retirarla oferta');
                $('tr #botonera').html("");
                $("tr #botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + "modal_retioferta" + "&#39;);'>Ok</div>");
                $('#modal_retioferta').show();
                return false;
            }

            if (dar == 90) {
                $("#mycontenidooferta").html("");
                $("#mycontenidooferta").html("El evento ya esta progreso, No es posible Retirar la Oferta!");
                $('tr #botonera').html("");
                $("tr #botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + "modal_retioferta" + "&#39;);'>Ok</div>");
                $('#modal_retioferta').show();
                return false;
            }

            $("#mycontenidooferta").html("");
            $("#mycontenidooferta").html("La oferta Fúe Retirada!!");
            $('tr #botonera').html("");
            $("tr #botonera").html("<div id='botcan' class='modalb'  onclick='proc_retira_oferta_fin(" + dar + ");'>Ok</div>");
            $('#modal_retioferta').show();
        }

    )
}

function proc_retira_oferta_fin(codcl) {
    $('#modal_retioferta').hide();
    inferior = 0;
    ir_areasocial(codcl);
}

function ir_apuestasdeporteslista(idqui) {
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/Cprincipal/apuestasdeporteslista", {
        "vidqui": idqui
    },
        function (data) {
            $("#eventosxxx").html(data).fadeIn('slow');
        }
    )
}

function consultar_apuestapollaquiniela(idqui) {
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/apostar/Capostarpollas/consultarmiquiniela", {
        "vidqui": idqui
    },
        function (data) {
            $("#eventosxxx").html(data).fadeIn('slow');
        }
    )
}

function set_pagina_misapuestas(inf) {
    inferior = inf;
    ir_areasocial(-1);
}

function validar_datos() {
    if ($("#usuario_correo").val() == '') {
        $('#error0').show();
        $('#error0').html('El Correo o Usuario son requeridos!!');
        return false;
    }

    $.post(caminotmp + "/clientes/Cclientes/recuperar_cuenta_validar_cliente", {
        "vusuario_correo": $("#usuario_correo").val()
    },
        function (data) {

            if (data == -98) {
                $('#error0').show();
                $('#error0').html('El Usuario o Correo No Existen!!');
                return false;
            } else if (data == -99) {
                $('#error0').show();
                $('#error0').html('No se poseen Preguntas de Seguridad Guardadas. Comuníquese al Correo: ejemplo@panapuestas.com');
                return false;
            } else {
                $('#preguntas_seguridad').html(data);
                generar_captcha();
                $("#datos_recuperar").hide();
                $('#restaurar_captcha').show();
                $("#cambio_botonera").html("<button type='button' id='btn_enviar' style='width:140px;' class='areasbtn' onclick='recuperar_cuenta();'>Modificar</button>");
                $("#error0").hide();
            }
        }
    )
}

function recuperar_cuenta() {

    if ($("#pregunta1").val() == 0) {
        $('#error0').show();
        $('#error0').html('La Primera Pregunta es requerida!!');
        return false;
    }

    if ($("#pregunta2").val() == 0) {
        $('#error0').show();
        $('#error0').html('La Segunda Pregunta es requerida!!');
        return false;
    }

    if ($("#respuesta1").val() == "") {
        $('#error0').show();
        $('#error0').html('La Primera Respuesta es requerida!!');
        return false;
    }

    if ($("#respuesta2").val() == "") {
        $('#error0').show();
        $('#error0').html('La Segunda Respuesta es requerida!!');
        return false;
    }

    if ($("#respuesta_captcha").val() == "") {
        $('#error0').show();
        $('#error0').html('La Respuesta del Captcha no puede estar Vacía!!');
        $("#respuesta_captcha").focus();
        return false;
    }

    if ($("#respuesta_captcha").val() != $("#resultado").val()) {
        $('#error0').show();
        $('#error0').html('El Resultado no es Correcto!!');
        $("#respuesta_captcha").focus();
        return false;
    }

    $.post(caminotmp + "/clientes/Cclientes/recuperar_cuenta_validar_preguntas", {
        "vpregunta1": $("#pregunta1").val(),
        "vpregunta2": $("#pregunta2").val(),
        "vrespuesta1": $("#respuesta1").val(),
        "vrespuesta2": $("#respuesta2").val(),
        "vidcliente": $("#cliente").val()
    },
        function (data) {
            if (data == 99) {
                $('#error0').show();
                $('#error0').html('Sus Respuestas No coinciden con las Suministradas!!');
                return false;
            } else {
                $("#conte2").hide();
                $('#modal_confirmar_clave').html(data);
            }
        }
    )
}

function modificar_clave_cliente() {

    if ($("#nueva_clave1").val() == "") {
        $('#errorM').show();
        $('#errorM').html('El Campo Nueva Contraseña es requerido!!');
        $("#nueva_clave1").focus();
        return false;
    }

    if ($("#nueva_clave1").val().length > 10) {
        $('#error0').show();
        $('#error0').html('La Nueva Contraseña del usuario es demasiado larga máximo 10 caracteres!!');
        $("#nueva_clave1").focus();
        return false;
    }

    if ($("#nueva_clave1").val().length < 6) {
        $('#error0').show();
        $('#error0').html('La Nueva Contraseña del usuario es demasiado corta mínimo 6 caracteres!!');
        $("#nueva_clave1").focus();
        return false;
    }

    regexpass = new RegExp(/[¡¨!^&*()+|~=`{}\[\]:";'<>?,\/]|[^0-9A-z_$#.%@-]/, 'g');

    if (regexpass.test($("#nueva_clave1").val())) {
        $('#error0').show();
        $('#error0').html('La Nueva Contraseña del usuario solo puede contener letras, numero y los siguientes caracteres : "_ $ # . % @ - " !!');
        $("#nueva_clave1").focus();
        return false;
    }

    if ($("#nueva_clave2").val() == "") {
        $('#errorM').show();
        $('#errorM').html('El Campo Repetir Contraseña es requerido!!');
        $("#nueva_clave2").focus();
        return false;
    }

    if ($("#nueva_clave2").val() != $("#nueva_clave1").val()) {
        $('#errorM').show();
        $('#errorM').html('Las Contraseñas no Coinciden!');
        return false;
    }

    $.post(caminotmp + "/clientes/Cclientes/recuperar_cuenta", {
        "vclave": $("#nueva_clave2").val(),
        "vidcliente": $("#cliente").val()
    },
        function (data) {
            if (data == 1) {
                $("#modal_header_recuperar").hide();
                $("#tdboton").hide();
                $("#cuerpo_modal").html("<h3>Cambios Realizados!!. Su Contraseña ha sido enviada a su Dirección de Correo. Espere unos Segundos...</h3>");
            }
        })
}

function check_cuentas_usuario(cliente) {
    $.post(caminotmp + "/cprincipal/comprobar_bancoscliente", {
        "vidcliente": cliente
    },
        function (data) {

            if (data == 0) {
                modal_informacion
                $("#modal_informacion").show();
            }
        }
    )
}

function ocultarmodal(mymodal) {
    var myobj = "#" + mymodal;
    $(myobj).hide();
}

function desactivar_color_menu() {
    $("#op_1").removeClass("actvMPo");
    $("#op_2").removeClass("actvMPo");
    $("#op_3").removeClass("actvMPo");
    $("#op_4").removeClass("actvMPo");
    $("#op_5").removeClass("actvMPo");
    $("#op_6").removeClass("actvMPo");
    $("#op_7").removeClass("actvMPo");
    $("#op_8").removeClass("actvMPo");
}

function mostrar_opcion(opcion) {
    orden1 = -1;
    campo = 1;
    ultima_opcion = opcion;
    var ruta;

    desactivar_color_menu();

    if (opcion == 1) {
        $("#op_1").addClass("actvMPo");
        ruta = caminotmp + "/clientes/Cclientes/cargaDatos_datosbasicos";
    } else if (opcion == 2) {
        $("#op_2").addClass("actvMPo");
        ruta = caminotmp + "/clientes/Cclientes/cargaDatosBancos";
    } else if (opcion == 3) {
        $("#op_3").addClass("actvMPo");
        ruta = caminotmp + "/clientes/Cclientes/cargaDatosDepositos";
    } else if (opcion == 4) {
        $("#op_4").addClass("actvMPo");
        ruta = caminotmp + "/clientes/Cclientes/cargaDatosRetiros";
    } else if (opcion == 5) {
        $("#op_5").addClass("actvMPo");
        ruta = caminotmp + "/clientes/Cclientes/cargaDatosHistoriaApuestas";
    } else if (opcion == 6) {
        $("#op_6").addClass("actvMPo");
        ruta = caminotmp + "/clientes/Cclientes/cargaDatosSugerencias";
    } else if (opcion == 7) {
        $("#op_7").addClass("actvMPo");
        ruta = caminotmp + "/clientes/Cclientes/cargaDatosReclamos";
    } else if (opcion == 8) {
        $("#op_8").addClass("actvMPo");
        ruta = caminotmp + "/clientes/Cclientes/cargaDatosEstadosBalances";
    }

    $.post(ruta, { "vaccion": 1 },
        function (data) {
            if (data) {
                $("#mostrar-opcion").html(data).fadeIn('slow');
            } else {
                alert("error");
            }
        }
    )
    detenerJS();
}

$("#tlfmovil_cliente").keypress(function (event) {
    return solo_numerosenterostelefonicos(event);
});

$("#tlflocal_cliente").keypress(function (event) {
    return solo_numerosenterostelefonicos(event);
});

function act_datos(vaccion) {
    $('#error0').removeClass('Oppositivo');

    var correo = $("#email_cliente").val();

    if ($.trim($("#nombres_cliente").val()) == "") {
        $('#error0').show();
        $('#error0').html('El nombre es requerido para actualizar los datos!!');
        $("#nombres_cliente").focus();
        return false;
    }

    if (!($("#nombres_cliente").val().match(/^[A-z ]+$/g))) {
        $('#error0').show();
        $('#error0').html('El nombre solo puede contener letras!!');
        $("#nombres_cliente").focus();
        return false;
    }

    if ($("#nombres_cliente").val().length > 25) {
        $('#error0').show();
        $('#error0').html('El nombre es demasiado largo máximo 25 caracteres!!');
        $("#nombres_cliente").focus();
        return false;
    }

    if ($("#nombres_cliente").val().length < 2) {
        $('#error0').show();
        $('#error0').html('El nombre es demasiado corto!!');
        $("#nombres_cliente").focus();
        return false;
    }

    if ($.trim($("#apellidos_cliente").val()) == "") {
        $('#error0').show();
        $('#error0').html('El nombre es requerido para actualizar los datos!!');
        $("#apellidos_cliente").focus();
        return false;
    }

    if (!($("#apellidos_cliente").val().match(/^[A-z ]+$/g))) {
        $('#error0').show();
        $('#error0').html('El nombre solo puede contener letras!!');
        $("#apellidos_cliente").focus();
        return false;
    }

    if ($("#apellidos_cliente").val().length > 25) {
        $('#error0').show();
        $('#error0').html('El nombre es demasiado largo máximo 25 caracteres!!');
        $("#apellidos_cliente").focus();
        return false;
    }

    if ($("#apellidos_cliente").val().length < 2) {
        $('#error0').show();
        $('#error0').html('El nombre es demasiado corto!!');
        $("#apellidos_cliente").focus();
        return false;
    }

    if ($("#doc_identidad").val() == '') {
        $('#error0').show();
        $('#error0').html('El Documento de Identidad requerido!!');
        $("#doc_identidad").focus();
        return false;
    }

    if ($("#doc_identidad").val().startsWith("0")) {
        $('#error0').show();
        $('#error0').html('El Número de identidad no puede iniciar en 0!!');
        $("#doc_identidad").focus();
        return false;
    }

    if (!(DN($("#doc_identidad").val()).toString().match(/^[0-9]+$/g))) {
        $('#error0').show();
        $('#error0').html('El Número de identidad solo puede contener números!!');
        $("#doc_identidad").focus();
        return false;
    }

    if (DN($("#doc_identidad").val()).toString().length > 9) {
        $('#error0').show();
        $('#error0').html('El Número de identidad es muy largo, máximo 10 números!!');
        $("#doc_identidad").focus();
        return false;
    }

    if ($("#doc_identidad").val().length < 5) {
        $('#error0').show();
        $('#error0').html('El Número de identidad es muy corto, mínimo 5 números!!');
        $("#doc_identidad").focus();
        return false;
    }

    if (!($("#sexo_cliente").val() == 'M' || $("#sexo_cliente").val() == 'F')) {
        $('#error0').show();
        $('#error0').html('El sexo es erróneo!!');
        $("#sexo_cliente").focus();
        return false;
    }

    if ($("#idpais_cliente").val() == 0) {
        $('#error0').show();
        $('#error0').html('El país es requerido para actualizar los datos!!');
        $("#idpais_cliente").focus();
        return false;
    }

    if ($("#idpais_cliente").val().length > 25) {
        $('#error0').show();
        $('#error0').html('El nombre del país es demasiado largo máximo 25 caracteres!!');
        $("#idpais_cliente").focus();
        return false;
    }

    if (($("#idpais_cliente").val().match(/^[A-z ]+$/g))) {
        $('#error0').show();
        $('#error0').html('El nombre del país es erróneo!!');
        $("#idpais_cliente").focus();
        return false;
    }

    if ($("#fecha_nac_cliente").val() == '') {
        $('#error0').show();
        $('#error0').html('La Fecha de Nacimiento requerido!!');
        return false;
    }

    if ($("#tlflocal_cliente").val() == '' && $("#tlfmovil_cliente").val() == '') {
        $('#error0').show();
        $('#error0').html('Al menos 1 número teléfónico es requerido!!');
        return false;
    }

    if ($("#tlflocal_cliente").val() != '') {
        if (!($("#tlflocal_cliente").val().match(/^[0-9]+$/g))) {
            $('#error0').show();
            $('#error0').html('El telefono solo puede contener numeros!!');
            $("#tlflocal_cliente").focus();
            return false;
        }
    }

    if ($("#tlfmovil_cliente").val() != '') {
        if (!($("#tlfmovil_cliente").val().match(/^[0-9]+$/g))) {
            $('#error0').show();
            $('#error0').html('El celular solo puede contener numeros!!');
            $("#tlfmovil_cliente").focus();
            return false;
        }
    }

    if ($.trim($("#localidad_cliente").val()) == "") {
        $('#error0').show();
        $('#error0').html('La Ciudad es requerida para actualizar los datos!!');
        $("#localidad_cliente").focus();
        return false;
    }

    if (!($("#localidad_cliente").val().match(/^[A-z ]+$/g))) {
        $('#error0').show();
        $('#error0').html('La Ciudad solo puede contener letras!!');
        $("#localidad_cliente").focus();
        return false;
    }

    if ($("#localidad_cliente").val().length > 25) {
        $('#error0').show();
        $('#error0').html('El nombre de la ciudad es demasiado largo máximo 25 caracteres!!');
        $("#localidad_cliente").focus();
        return false;
    }

    if ($("#localidad_cliente").val().length < 5) {
        $('#error0').show();
        $('#error0').html('El nombre de la ciudad es demasiado corto mínimo 5 caracteres!!');
        $("#localidad_cliente").focus();
        return false;
    }

    if (correo.indexOf(".") == -1 || correo.indexOf("@") == -1 || correo[0] == "@" || correo.indexOf("@") == correo.indexOf(".") - 1 ||
        correo.indexOf("@") == correo.indexOf(".") + 1 || correo.indexOf("@") == (correo.length - 1) || correo[correo.length - 1] == ".") {
        $('#error0').show();
        $('#error0').html('Formato de Correo No Válido o Campo Vacío!!');
        $("#email_cliente").focus();
        return false;
    }

    if ($("#pregunta1").val() == 0) {
        $('#error0').show();
        $('#error0').html('La Primera Pregunta es requerida!!');
        return false;
    }

    if ($("#pregunta2").val() == 0) {
        $('#error0').show();
        $('#error0').html('La Segunda Pregunta es requerida!!');
        return false;
    }

    if ($("#respuesta1").val() == "") {
        $('#error0').show();
        $('#error0').html('La Primera Respuesta es requerida!!');
        return false;
    }

    if ($("#respuesta2").val() == "") {
        $('#error0').show();
        $('#error0').html('La Segunda Respuesta es requerida!!');
        return false;
    }

    $.post(caminotmp + "/clientes/Cclientes/actualizarDatosCliente", {
        "vaccion": 1,
        "vdocidentidad": $("#doc_identidad_ident").val() + DN($("#doc_identidad").val()),
        "vprimernombre": $("#nombres_cliente").val(),
        "vsegundonombre": $("#apellidos_cliente").val(),
        "vsexo": $("#sexo_cliente").val(),
        "vpais": $("#idpais_cliente").val(),
        "vlocalidad": $("#localidad_cliente").val(),
        "vtelefonofijo": $("#tlflocal_cliente").val(),
        "vtelefonomovil": $("#tlfmovil_cliente").val(),
        "vcuentafacebock": $("#facebook_cliente").val(),
        "vcuentatitter": $("#twitter_cliente").val(),
        "vusuarionickname": $("#nickname_cliente").val(),
        "vcorreoelectronico": correo,
        "vpregunta1": $("#pregunta1").val(),
        "vpregunta2": $("#pregunta2").val(),
        "vrespuesta1": $("#respuesta1").val(),
        "vrespuesta2": $("#respuesta2").val(),
    },
        function (data) {
            if (data == 1) {
                $('#error0').show();
                $('#error0').addClass('Oppositivo');
                $('#error0').html('Datos Actualizados Correctamente!!');
            }
        }
    )
}

function cambiar_selector(objeto) {
    if (objeto.id == "pregunta1")
        ejecutar_cambio_selector("pregunta2", objeto.value, $("#pregunta2").val());
    else
        ejecutar_cambio_selector("pregunta1", objeto.value, $("#pregunta1").val());
}

function ejecutar_cambio_selector(idpregunta, valor, opcion_actual) {
    $.post(caminotmp + "/clientes/Cclientes/actualizar_selectores", {
        "vid": valor,
        "vpregunta": idpregunta,
        "vopcion_actual": opcion_actual
    },
        function (data) {
            var datos = JSON.parse(data);
            $("#" + datos.pregunta).html(datos.selector);

        })

    return false;
}

function ir_registrarcuenta(idcliente) {
    ocultarmodal('modal_informacion');
    $.post(caminotmp + "/clientes/Cclientes/cargaDatos", {
        "vpantalla": 2
    },
        function (data) {
            if (data) {
                $("#baseprincipal").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
    return false;
}

function retornar_index() {
    if (limpiatime == 1) {
        clearInterval(timer);
        limpiatime = 0;
    }
    $.post(caminotmp + "/Ctablerojuego/cargartablero", {
        "ventra": 0
    },

        function (data) {

            $('#baseprincipal').html(data).fadeIn('slow');
            ir_areacategorias();
            ir_areaeventos(-1, -1, -1, -1, -1, 1);
            ir_areasocial(-1);
        });

    detenerJS();
    return false;
}

// Funciones para los bancos agregados por los clientes!!!

var orden1 = -1;
var campo = 1;

function load(page) {
    $('#botoneras').html('');
    $('#error0').css('display', 'none');
    $('#botoneras').html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity;">');
    $("#loader").fadeIn('slow');

    var ruta_carga = "";

    if (ultima_opcion == 2) {
        campo = -1;
        ruta_carga = "/clientes/Cclientes/cargaCrudBancos";
    } else if (ultima_opcion == 3) {
        campo = -1;
        ruta_carga = "/clientes/Cclientes/cargaCrudDepositos";
    } else if (ultima_opcion == 4) {
        campo = -1;
        ruta_carga = "/clientes/Cclientes/cargaCrudRetiros";
    } else if (ultima_opcion == 6) {
        campo = -1;
        ruta_carga = "/clientes/Cclientes/cargaCrudSugerencias";
    } else if (ultima_opcion == 7) {
        campo = -1;
        ruta_carga = "/clientes/Cclientes/cargaCrudReclamos";
    }

    $.post(caminotmp + ruta_carga, {
        "vbuscar": $("#q").val(),
        "vorden1": orden1,
        "vcampo": campo,
        "vpage": page,
        "vestado": -1
    },
        function (data) {
            if (data) {
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
}

function ordernar_bancos(obj, campo1, page) {
    var xcamp = campo1;
    campo = campo1;
    if (orden1 == -1) { orden1 = 0; } else {
        if (orden1 == 0) { orden1 = 1; } else { orden1 = 0; }
    }
    var q = $("#q").val();
    $("#loader").fadeIn('slow');
    $.post(caminotmp + "/clientes/Cclientes/cargaCrudBancos", {
        "vbuscar": $("#q").val(),
        "vorden1": orden1,
        "vcampo": campo,
        "vpage": page
    },
        function (data) {
            if (data) {
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
}

function loadPantalla_bancos(id, accion) {
    $('#error0').hide();
    $("#loader").fadeIn('slow');
    $.post(caminotmp + "/clientes/Cclientes/cargaFormulario_bancos", {
        "vid": id,
        "vaccion": accion
    },
        function (data) {
            if (data) {
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
}

function nuevoregistro_bancos() {
    loadPantalla_bancos(-1, 0);
    return false;
};

function nuevoregistro_sugerencias(page) {
    loadPantalla_sugerencias(-1, 0, 1, page);
    return false;
};

function nuevoregistro_reclamos(page) {
    loadPantalla_reclamos(-1, 0, 1, page);
    return false;
};

function act_datos_sugerencias(accion, edita, page) {
    var estado = 0;
    $('#btnacepta').css('display', 'none');
    if ($.trim($("#idsugerencias").val()) == '') {
        $('#error0').show();
        $('#error0').addClass('Opnegativo');
        $('#error0').html('La sugerencia es requerida!!');
        $('#btnacepta').css('display', '');
        $("#idsugerencias").focus();
        return false;
    }
    vaccion = accion;

    $('#btnacepta').hide();

    $.post(caminotmp + "/clientes/Cclientes/actualizar_sugerencias", {
        "vaccion": accion,
        "vid": $('#idtmp').val(),
        "vidsugerencias": $("#idsugerencias").val(),
        "vedita": edita,
        "vpage": page
    },
        function (data) {
            if (data) {
                if (data == -99) {
                    $('#error0').show();
                    $('#error0').addClass('Oppositivo');
                    $('#error0').html('Su sugerencia ya ha sido realizada!!!');
                    $('#btnacepta').css('display', 'none');
                    $("#idsugerencias").focus();
                    $("#idsugerencias").attr('readonly');
                    return false;
                }
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
                return false;
            } else {
                alert("error");
            }
        }
    )
}

function act_datos_reclamos(accion, edita, page) {
    var estado = 0;
    $('#btnacepta').css('display', 'none');
    if ($.trim($("#idreclamos").val()) == '') {
        $('#error0').show();
        $('#error0').addClass('Opnegativo');
        $('#error0').html('La sugerencia es requerida!!');
        $('#btnacepta').css('display', '');
        $("#idreclamos").focus();
        return false;
    }
    vaccion = accion;
    $.post(caminotmp + "/clientes/Cclientes/actualizar_reclamos", {
        "vaccion": accion,
        "vid": $('#idtmp').val(),
        "vidreclamos": $("#idreclamos").val(),
        "vedita": edita,
        "vpage": page
    },
        function (data) {
            if (data) {
                if (data == -99) {
                    $('#error0').show();
                    $('#error0').addClass('Oppositivo');
                    $('#error0').html('Su reclamo ya ha sido realizada!!!');
                    $('#btnacepta').css('display', 'none');
                    $("#idreclamos").focus();
                    $("#idreclamos").attr('readonly');
                    return false;
                }
                $('#btnacepta').css('display', 'none')
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
                return false;
            } else {
                alert("error");
            }
        }
    )
}

function act_datos_bancos(accion) {
    var estado = 0;
    var vaccion = 0;
    if ($("#num_cuenta").val() == '') {
        $('#error0').show();
        $('#error0').html('El Número de Cuenta es requerido!!');
        $("#num_cuenta").focus();
        return false;
    }

    if ($("#idbanco").val() == 0) {
        $('#error0').show();
        $('#error0').html('La entidad bancaria es requerida!!');
        return false;
    }


    if ($("#num_cuenta").val().length < 20) {
        $('#error0').show();
        $('#error0').html('El Número de Cuenta debe tener 20 dígitos!!');
        $("#num_cuenta").focus();
        return false;
    }

    $('#btnacepta').hide();

    vaccion = accion;
    $.post(caminotmp + "/clientes/Cclientes/actualizar_bancos", {
        "vaccion": vaccion,
        "vid": $('#idtmp').val(),
        "vidbanco": $("#idbanco").val(),
        "vcuenta": $("#num_cuenta").val(),
        "vpais": $("#idpais").val(),
        "vmoneda": $("#idmoneda").val()
    },
        function (data) {
            if (data) {
                if (data == -99) {
                    $('#error0').show();
                    $('#error0').html('El Número de Cuenta Ya esta registrada!!!');
                    $("#num_cuenta").focus();
                    return false;
                }
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
                return false;
            } else {
                alert("error")
            }
        }
    )
    return false;
}

function obtener_datos_bancos(id) {
    loadPantalla_bancos(id, 1)
    return false;
}

function eliminar_bancos(id) {
    loadEliminar_bancos(id, 2);
    return false;
}

function loadEliminar_bancos(id, accion) {
    var metodo = "modal_clientes_bancos"

    if ((cantidad_registros - 1) % 10 == 0 && pagina_actual != 1) {
        var aux_pagina = pagina_actual - 1;
    } else
        var aux_pagina = pagina_actual;

    $('#modal_clientes_bancos').hide();
    $.post(caminotmp + "/clientes/Cclientes/eliminar_bancos", {
        "vid": id,
        "vaccion": accion
    },
        function (data) {
            if (data == id) {
                $('#botonerabanco').html("");
                $("#mycontenidoclban").html("La Cuenta Bancaria Fue Eliminada!");
                $("#botonerabanco").html("<div id='botcanclban' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Ok</div>");
                $('#modal_clientes_bancos').show();
                load(aux_pagina);
            } else {
                if (data == -1451) {
                    $('#botonerabanco').html("");
                    $("#mycontenidoclban").html("Esta Cuenta de Banco,Tiene Movimientos de Cuentas Asociados,Por lo Tanto no se Puede Eliminar!");
                    $("#botonerabanco").html("<div id='botcanclban' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Ok</div>");
                    $('#modal_clientes_bancos').show();
                } else {
                    alert("No se Elimino");
                }
            }
        })
}

function abrir_modal_bancos(id) {
    var metodo = "modal_clientes_bancos"
    $('#botonerabanco').html("");
    $("#mycontenidoclban").html("Desea Eliminar la Cuenta de Banco?");
    $("#botonerabanco").html("<div id='botconfirbanco' class='modalb' onclick='eliminar_bancos(" + id + ");'>Confirmar</div><div id='botcanclban' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $('#modal_clientes_bancos').show();
}

function eliminar_sugerencias(id) {
    loadEliminar_sugerencias(id, 2);
    return false;
}

function eliminar_reclamos(id) {
    loadEliminar_reclamos(id, 2);
    return false;
}

function loadEliminar_sugerencias(id, accion) {
    $("#botonerasugerencias").html("");
    $("#mycontenidoclsug").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');

    var metodo = "modal_clientes_sugerencias"

    if ((cantidad_registros - 1) % 10 == 0 && pagina_actual != 1) {
        var aux_pagina = pagina_actual - 1;
    } else
        var aux_pagina = pagina_actual;

    $('#modal_clientes_sugerencias').hide();

    $.post(caminotmp + "/clientes/Cclientes/eliminar_sugerencias", {
        "vid": id,
        "vaccion": accion
    },
        function (data) {
            if (data == id) {
                $('#botonerasugerencias').html("");
                $("#mycontenidoclsug").html("Su sugerencia fue Eliminada!");
                $("#botonerasugerencias").html("<div id='botcanclsugerencias' class='modalb' onclick='load(" + aux_pagina + ");'>Ok</div>");
                $('#modal_clientes_sugerencias').show();
            } else {
                if (data == -1451) {
                    $('#botonerasugerencias').html("");
                    $("#mycontenidoclsug").html("");
                    $("#botonerasugerencias").html("<div id='botcanclsugerencias' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Ok</div>");
                    $('#modal_clientes_sugerencias').show();
                } else {
                    alert("No se Elimino");
                }
            }
        })
}

function loadEliminar_reclamos(id, accion) {
    $("#botonerareclamos").html("");
    $("#mycontenidoclrec").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');

    var metodo = "modal_clientes_reclamos";

    if ((cantidad_registros - 1) % 10 == 0 && pagina_actual != 1) {
        var aux_pagina = pagina_actual - 1;
    } else
        var aux_pagina = pagina_actual;

    $('#modal_clientes_reclamos').hide();
    $.post(caminotmp + "/clientes/Cclientes/eliminar_reclamos", {
        "vid": id,
        "vaccion": accion
    },
        function (data) {
            ;
            if (data == id) {
                $('#botonerareclamos').html("");
                $("#mycontenidoclrec").html("Su reclamos fue Eliminado!");
                $("#botonerareclamos").html("<div id='botcanclreclamos' class='modalb' onclick='load(" + aux_pagina + ");'>Ok</div>");
                $('#modal_clientes_reclamos').show();
            } else {
                if (data == -1451) {
                    $('#botonerareclamos').html("");
                    $("#mycontenidoclrec").html("");
                    $("#botonerareclamos").html("<div id='botcanclreclamos' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Ok</div>");
                    $('#modal_clientes_reclamos').show();
                } else {
                    alert("No se Elimino");
                }
            }
        })
}

function abrir_modal_sugerencias(id) {
    var metodo = "modal_clientes_sugerencias";
    $('#botonerasugerencias').html("");
    $("#mycontenidoclsug").html("Desea Eliminar su sugerencia?");
    $("#botonerasugerencias").html("<div id='botconfirsugerencias' class='modalb' onclick='eliminar_sugerencias(" + id + ");'>Confirmar</div><div id='botcanclsugerencias' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $('#modal_clientes_sugerencias').show();
}

function abrir_modal_reclamos(id) {
    var metodo = "modal_clientes_reclamos";
    $('#botonerareclamos').html("");
    $("#mycontenidoclrec").html("Desea Eliminar su reclamo?");
    $("#botonerareclamos").html("<div id='botconfirreclamos' class='modalb' onclick='eliminar_reclamos(" + id + ");'>Confirmar</div><div id='botcanclreclamos' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $('#modal_clientes_reclamos').show();
}

function abrir_modal_retiros(id) {
    var metodo = "modal_clientes_retiros";
    $('#botoneraretiros').html("");
    $("#mycontenidoclret").html("Desea Eliminar su Retiro?");
    $("#botoneraretiros").html("<div id='botconfirretiros' class='modalb' onclick='eliminar_datos_retiros(" + id + ");'>Confirmar</div><div id='botcanclretiros' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $('#modal_clientes_retiros').show();
}
function abrir_modal_retirosel(id) {
    var metodo = "modal_clientes_retiros";
    $('#botoneraretiros').html("");
    $("#mycontenidoclret").html("Desea Eliminar su Retiro?");
    $("#botoneraretiros").html("<div id='botconfirretiros' class='modalb' onclick='eliminar_datos_retirosa1(" + id + ");'>Confirmar</div><div id='botcanclretiros' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $('#modal_clientes_retiros').show();
}
function retornar_indexfun() {
    retornar_index();
}

function ordernar_depositos(obj, campo1, page) {
    var xcamp = campo1;
    campo = campo1;
    if (orden1 == -1) {
        orden1 = 0;
    } else {
        if (orden1 == 0) {
            orden1 = 1;
        } else {
            orden1 = 0;
        }
    }

    var q = $("#q").val();
    $("#loader").fadeIn('slow');
    $.post(caminotmp + "/clientes/Cclientes/cargaCrudDepositos", {
        "vbuscar": $("#q").val(),
        "vorden1": orden1,
        "vcampo": campo,
        "vpage": page
    },
        function (data) {
            if (data) {
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
}

function loadPantalla_depositos(id, accion) {
    $('#error0').hide();
    $("#loader").fadeIn('slow');
    $.post(caminotmp + "/clientes/Cclientes/cargaFormulario_depositos", {
        "vid": id,
        "vaccion": accion
    },
        function (data) {
            if (data) {
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
}

function nuevoregistro_depositos() {
    loadPantalla_depositos(-1, 0);
    return false;
};

function obtener_datos_depositos(id) {
    loadPantalla_depositos(id, 1)
    return false;
}

function modificar_datos_depositos(id) {
    loadPantalla_depositos(id, 5)
    return false;
}

function consultar_datos_cuenta_casa(valor) {

    if (valor != 0) {
        $.post(caminotmp + "/clientes/Cclientes/consultar_datos_cuenta_casa", {
            "vid": valor
        },
            function (data) {
                if (data) {
                    $("#mostrar_datos").html(data).fadeIn('slow');
                } else {
                    alert("error")
                }
            }
        )
    } else {
        $("#mostrar_datos").html("").fadeIn('slow');
    }
}

function act_datos_depositos(accion) {
    var monto = DN($('#monto').val());
    var file = $('input[name=userfile]')[0].files[0];

    if ($("#idbanco_cliente").val() == 0) {
        $('#error0').show();
        $('#error0').html('La Cuenta Origen del Cliente es Obligatoria!!');
        return false;
    }

    if ($("#idbanco_casa").val() == 0) {
        $('#error0').show();
        $('#error0').html('La Cuenta a Depositar es Obligatoria!!');
        return false;
    }
    if (solounacoma($("#monto").val()) > 1 || $("#monto").val() == "'") {
        $('#error0').show();
        $('#error0').html('¡El formato de monto es invalido!');
        return false;
    }

    if ($("#monto").val() == '') {
        $('#error0').show();
        $('#error0').html('El Monto es Obligatorio!!');
        return false;
    }

    if ($("#fecha").val() == '') {
        $('#error0').show();
        $('#error0').html('La Fecha es Obligatoria!!');
        return false;
    }

    if ($("#referencia").val() == '') {
        $('#error0').show();
        $('#error0').html('La Referencia es Obligatoria!!');
        return false;
    }

    var ref = $("#referencia").val();

    if (ref.length < 4) {
        $('#error0').show();
        $('#error0').html('La Referencia es demasiado corta!!');
        return false;
    }

    if (ref.length > 20) {
        $('#error0').show();
        $('#error0').html('La Referencia es demasiado larga!!');
        return false;
    }

    if (monto.length > 2) {
        $('#error0').show();
        $('#error0').html('El monto posee un formato incorrecto!!');
        return false;
    }
    if (!($('#confirlic').prop('checked'))) {
        $('#error0').show();
        $('#error0').html('Debe confirmar que el dinero proviene de fondos licitos para crear el deposito.');
        return false;
    }

    // validamos si la referencia existe

    $.post(caminotmp + "/Cprincipal/validarreferenciadeposito", {

        "vreferencia": $("#referencia").val()

    }, function (data) {
        if (data) {
            if (data == 1 && $("#referencia").val() != $("#refant").val()) {
                $('#error0').html('Esta Referencia ya fue registrada por otro Cliente!');
                $('#error0').show();
                return false;
            } else {

                var nombre_archivo = "";
                var form = new FormData();
                form.append("userfile", file);
                form.append("vid", $('#idtmp').val());

                if (file) {
                    $.ajax({
                        url: caminotmp + "/clientes/Cclientes/Func_cargaArchivo",
                        type: "post",
                        data: form,
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            var nombre_archivo = data.nombre_archivo;
                            if (data.respuesta == true) {
                                $('#btnacepta').hide();
                                $.post(caminotmp + "/clientes/Cclientes/actualizar_depositos", {
                                    "vid": $('#idtmp').val(),
                                    "vaccion": accion,
                                    "vidctacliente": $('#idbanco_cliente').val(),
                                    "vidctacasa": $('#idbanco_casa').val(),
                                    "vmonto": monto,
                                    "vimgtrans": nombre_archivo,
                                    "vfechadeposito": $('#fecha').val(),
                                    "vobservacion": $('#observacion').val(),
                                    "vreferencia": $('#referencia').val()
                                }, function (data) {
                                    if (data) {
                                        $(".outer_div").html(data).fadeIn('slow');
                                        $('#loader').html('');
                                    } else {
                                        alert("error");
                                    }
                                });
                            } else {
                                alert(data.error);
                                $('#error0').show();
                                $('#error0').html(data.error);
                            }
                        }
                    });
                } else {
                    var nombre_archivo = $('#userfilee').val();
                    $('#btnacepta').hide();
                    $.post(caminotmp + "/clientes/Cclientes/actualizar_depositos", {
                        "vid": $('#idtmp').val(),
                        "vaccion": accion,
                        "vidctacliente": $('#idbanco_cliente').val(),
                        "vidctacasa": $('#idbanco_casa').val(),
                        "vmonto": monto,
                        "vimgtrans": nombre_archivo,
                        "vfechadeposito": $('#fecha').val(),
                        "vobservacion": $('#observacion').val(),
                        "vreferencia": $('#referencia').val()
                    }, function (data) {
                        if (data) {
                            $(".outer_div").html(data).fadeIn('slow');
                            $('#loader').html('');
                        } else {
                            alert("error");
                        }
                    });
                }
            }
        } else {
            alert("error");
        }
    });
}



// Funciones para los Retiros de los clientes
function ordernar_retiros(obj, campo1, page) {
    var xcamp = campo1;
    campo = campo1;

    if (orden1 == -1) {
        orden1 = 0;
    } else {
        if (orden1 == 0) {
            orden1 = 1;
        } else {
            orden1 = 0;
        }
    }

    var q = $("#q").val();
    $("#loader").fadeIn('slow');
    $.post(caminotmp + "/clientes/Cclientes/cargaCrudRetiros", {
        "vbuscar": $("#q").val(),
        "vorden1": orden1,
        "vcampo": campo,
        "vpage": page
    },
        function (data) {
            if (data) {
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
}

function loadPantalla_retiros(id, accion) {
    $('#error0').hide();
    $("#loader").fadeIn('slow');
    $.post(caminotmp + "/clientes/Cclientes/cargaFormulario_retiros", {
        "vid": id,
        "vaccion": accion
    },
        function (data) {
            if (data) {
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
}

function loadPantalla_sugerencias(id, accion, edita, page) {
    $('#error0').hide();
    $("#loader").fadeIn('slow');
    $.post(caminotmp + "/clientes/Cclientes/cargaFormulario_sugerencias", {
        "vid": id,
        "vaccion": accion,
        "vedita": edita,
        "vpage": page

    },
        function (data) {
            if (data) {
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
}

function obtener_datos_sugerencias(id, edita, page) {
    loadPantalla_sugerencias(id, 1, edita, page);
    return false;
}

function obtener_datos_reclamos(id, edita, page) {
    loadPantalla_reclamos(id, 1, edita, page);
    return false;
}

function loadPantalla_reclamos(id, accion, edita, page) {
    $('#error0').hide();
    $("#loader").fadeIn('slow');
    $.post(caminotmp + "/clientes/Cclientes/cargaFormulario_reclamos", {
        "vid": id,
        "vaccion": accion,
        "vedita": edita,
        "vpage": page
    },
        function (data) {
            if (data) {
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                alert("error")
            }
        }
    )
}

function nuevoregistro_retiros() {
    loadPantalla_retiros(-1, 0);
    return false;
};

function obtener_datos_retiros(id) {
    loadPantalla_retiros(id, 0);
    return false;
};

function ver_datos_retiros(id) {
    loadPantalla_retiros(id, 1);
    return false;
};

function modificar_datos_retiros(id) {
    loadPantalla_retiros(id, 5);
    return false;
};

function eliminar_datos_retirosa1(id) {
    $.post(caminotmp + "/clientes/Cclientes/eliminar_retiroscl", {
        "vid": id,
        "vbuscar": $("#q").val(),
        "vorden1": orden1,
        "vcampo": campo,
        "vpage": 1,
        "vestado": -1
    }, function (data) {
        if (data) {
            if (data == 99) {
                $('#error0').show();
                $('#error0').html('El monto solicitado supera su disponibilidad!!');
                return false;
            }

            $(".outer_div").html(data).fadeIn('slow');
            $('#loader').html('');
        } else {
            alert("error")
        }
    })



}
function eliminar_datos_retiros(id) {



    loadPantalla_retiros(id, 2);
    return false;
};

function buscarhistorialapuestas() {

    if ($('#fecha1').val() == '') {
        $('#error0').show();
        $('#error0').html('La Fecha desde es requerida!');
        return false;
    }

    if ($('#fecha2').val() == '') {
        $('#error0').show();
        $('#error0').html('La Fecha hasta es requerida!');
        return false;
    }

    var fecha11 = $('#fecha1').val();
    var fecha22 = $('#fecha2').val();
    var x = fecha11.split('-');
    var z = fecha22.split('-');
    var tk = 0;
    if ($('#Ticket').val() == '') {
        tk = 0;
    } else {
        tk = $('#Ticket').val();
    }
    if (Date.parse(fecha11) > Date.parse(fecha22)) {
        $('#error0').show();
        $('#error0').html('La Fecha desde debe ser menor a la hasta!');
        return false;
    }

    var metodo = "mymodalhistoria";
    $.post(caminotmp + "/clientes/Cclientes/cargaDatosHistoriaApuestasdet", {
        "vfecha11": fecha11,
        "vfecha22": fecha22,
        "vticket": tk
    },
        function (data) {
            if (data) {
                var vdata = data;

                if (data == 99) {
                    $('#botonerahist').html("");
                    $("#mycontenidohist").html("Estimado Cliente usted no tiene historial de Apuestas");
                    $("#botonerahist").html("<div id='botcanhist' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Ok</div>");
                    $('#mymodalhistoria').show();
                    return false;
                }
                $(".outer_div").html(data).fadeIn('slow');
                $('#loader').html('');
            } else {
                $('#botonerahist').html("");
                $("#mycontenidohist").html("Estimado Cliente usted no tiene historial de Apuestas");
                $("#botonerahist").html("<div id='botcanhist' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Ok</div>");
                $('#mymodalhistoria').show();
            }
        }
    )
    return false;
};

function act_datos_retiros(accion) {
    if ($("#idbanco_cliente").val() == 0) {
        $('#error0').show();
        $('#error0').html('La Cuenta a retirar es Obligatoria!!');
        return false;
    }

    if (solounacoma($("#monto").val()) > 1 || $("#monto").val() == "'") {
        $('#error0').show();
        $('#error0').html('¡El formato de monto es invalido!');
        return false;
    }

    if ($("#monto").val() == '') {
        $('#error0').show();
        $('#error0').html('El Monto es Obligatorio!!');
        return false;
    }

    var monto = DN($('#monto').val());

    if (monto.length > 2) {
        $('#error0').show();
        $('#error0').html('El monto posee un formato incorrecto!!');
        return false;
    }

    $.post(caminotmp + "/clientes/Cclientes/actualizar_retiros", {
        "vid": $("#idtmp").val(),
        "vmonto": monto,
        "vidctacliente": $("#idbanco_cliente").val()
    }, function (data) {
        if (data) {
            if (data == 99) {
                $('#error0').show();
                $('#error0').html('El monto solicitado supera su disponibilidad!!');
                return false;
            }
            if (typeof data == "object") {
                var items = [];
                $.each(data, function (key, val) {
                    items.push(val);
                });
                let compare = items[0];
                if (compare == 98) {
                    $('#error0').show();
                    $('#error0').html('El monto solicitado supera el maximo de retiro ' + FN(items[1]) + ' !!');
                    return false;
                }
                if (compare == 97) {
                    $('#error0').show();
                    $('#error0').html('El monto solicitado es menor al minimo de retiro ' + FN(items[1]) + ' !!');
                    return false;
                }
            }

            $('#btnacepta').hide();
            $(".outer_div").html(data).fadeIn('slow');
            $('#loader').html('');
        } else {
            alert("error")
        }
    })
    return false;
}


function generar_captcha() {

    $.ajax({
        url: caminotmp + "/clientes/Cclientes/carga_captcha",
        type: "post",
        dataType: 'json',
        processData: false,
        contentType: false,

        success: function (data) {
            $("#genera_captcha").html("");
            $("#genera_captcha").append("<input type='hidden' id='resultado' value='" + data.resultado + "'>");
            $("#genera_captcha").append("<input  style=' width: 10%; border: none; background: rgba(0,0,0,0); text-align: center;' type='text' size='5' readonly value='" + data.elemento1 + "'>");
            $("#genera_captcha").append("<label style='font-family:verdana;font-weight: bold;' >" + data.signo + "</label>");
            $("#genera_captcha").append("<input  style=' width: 10%; border: none; background: rgba(0,0,0,0); text-align: center;' type='text' size='5' readonly value='" + data.elemento2 + "'>");
            $("#genera_captcha").append("<label style='font-size:20px; margin-left:5px; margin-right:5px;'>=</label>");
            $("#genera_captcha").append("<input class='areas' onkeypress='SgtR3(event);' style='cursor:initial; width: 80px; tex-align: left;' type='text' size='7' placeholder='Respuesta' id='respuesta_captcha'>");

        }
    });
}

// area de modales de apuestas
$("#textmonto").click(function (e) {
    $('#errortextmonto').hide();
    return false;
})

$("#errortextmonto").click(function (e) {
    $('#errortextmonto').hide();
    return false;
})

function ir_apostardeportelista(elemento, varmonto, elementoa, elementob) {
    var mimonto = "#" + varmonto;
    var miclase = "#idclase_" + elemento;
    var milogroaltabaja = "#idmilogro_ALTABAJA_" + elemento;
    var miidmilogro_A = "#idmilogro_A_" + elemento;
    var miidmilogro_B = "#idmilogro_B_" + elemento;
    var mielemento_A = "#idmiapuesta_A_" + elemento;
    var mielemento_B = "#idmiapuesta_B_" + elemento;

    var miseleccion = "#idseleccionado_" + elemento;
    var propuestalista = "#idpropuestacasa_" + elemento;
    var eventolista = "#idevento_" + elemento;
    var elepostador;
    var eleccasa;
    var error = "#error_" + elemento;
    var z;
    var vidmiseleccionapuesta = "#idmiseleccionapuesta_" + elemento;

    if ($(miclase).val() == '') {
        $(error).show();
        $(error).html('Debe seleccionar un tipo de apuesta');
        return false;
    }

    if ($(mimonto).val() <= 1) {
        $(error).show();
        $(error).html('El monto de la apuesta debe ser mayor a cero(0) ');
        return false;
    }

    if ($(vidmiseleccionapuesta).val() == 1) {
        elepostador = $(mielemento_A).val();
        eleccasa = $(mielemento_B).val();
        if ($(miidmilogro_A).val() > 0) {
            z = (($(miidmilogro_A).val() / 100) * $(mimonto).val());
        } else {
            z = ($(mimonto).val() / (($(miidmilogro_A).val() * -1) / 100));
        }
    }

    if ($(vidmiseleccionapuesta).val() == 2) {
        elepostador = $(mielemento_B).val();
        eleccasa = $(mielemento_A).val();
        if ($(miidmilogro_B).val() > 0) {
            z = (($(miidmilogro_B).val() / 100) * $(mimonto).val());
        } else {
            z = ($(mimonto).val() / (($(miidmilogro_B).val() * -1) / 100));
        }
    }

    // preparamos la apuesta de la alta del juego
    if ($(vidmiseleccionapuesta).val() == 3) {
        z = (($(milogroaltabaja).val() / 100) * $(mimonto).val());
    }

    // preparamos la apuesta de la baja del juego del juego
    if ($(vidmiseleccionapuesta).val() == 4) {
        z = (($(milogroaltabaja).val() / 100) * $(mimonto).val());
    }

    $('#btncan1lista').attr("disabled", false, "class", "btn  btn-default").html('Cancelar');
    if ($(vidmiseleccionapuesta).val() == 3 || $(vidmiseleccionapuesta).val() == 4) {
        $("#input_modal_propuestacasalista").html("<button type='button' id='btnconfir' onclick='apostar_comprapropuestacasaaltabaja(" + $(propuestalista).val() + "," + $(eventolista).val() + "," + elepostador + "," + $(mimonto).val() + ");' class='btn btn-primary'>Confirmar La Apuesta</button>");
    }

    if ($(vidmiseleccionapuesta).val() == 1 || $(vidmiseleccionapuesta).val() == 2) {
        $("#input_modal_propuestacasalista").html("<button type='button' id='btnconfir' onclick='apostar_propuestacasa(" + $(propuestalista).val() + "," + $(eventolista).val() + "," + elepostador + "," + eleccasa + "," + $(mimonto).val() + ");' class='btn btn-primary'>Confirmar La Apuesta</button>");
    }

    $('#modal_propuestacasalista').modal('show');

    $("#idleyendalista").html('<p>Su apuesta es de Bs:' + $(mimonto).val() + ' Para Ganar Bs: ' + z + '<p>');

    alert("dddaa" + elementob + ' var monto ' + milogroaltabaja + ' =' + $(milogroaltabaja).val() + ' zzz=' + z);
}

function retonapropuestacasa() {
    $("#apuestaprocasa").hide();
}

function ir_comprapropuestacasa(rutaa, rutab, sel, descri1, descri2, saldo, propuesta, evento, elementoa, elementob, logroa, logrob) {
    if (saldo <= 0) {
        $("#modal_sinsaldo").show();
        return false;
    }

    if (descri1 == '' && descri2 == '') { return false; }
    $("#apuestaprocasa").show();
    $("#idimga").attr("src", rutaa);
    $("#idimgb").attr("src", rutab);
    $("#lbl1").html(descri1 + "(" + logroa + ")");
    $("#lbl2").html(descri2 + "(" + logrob + ")");
    $("#idtrlogros").show();
    $("#idtrbaja").hide();
    $("#idcasaevento").val(evento);
    $("#idcasapropuesta").val(propuesta);
    $("#idcasapropuestalogroa").val(logroa);
    $("#idcasapropuestalogrob").val(logrob);
    $("#idelementoa").val(elementoa);
    $("#idelementob").val(elementob);
    $("#idclase").val(sel);
    $("#idllamado").val('logros');
    $("#textmonto").focus();
    $("#lblgana").html('Su ganancia seria de :');
    $("#lblganaaltabaja").html('Su ganancia seria de :');
    $("#lblganavalor").html('');
    $("#lblganavaloraltabaja").html('');
    $("#textmonto").val('');
}

$("#textmonto").blur(function () {
    var z;
    if ($("#idllamado").val() == 'altabaja') {
        z = (($("#idaltasbajas").val() / 100) * $("#textmonto").val());
    } else {
        if ($("#idcasapropuestalogroa").val() > 0) {
            z = (($("#idcasapropuestalogroa").val() / 100) * $("#textmonto").val());
        } else {
            z = ($("#textmonto").val() / (($("#idcasapropuestalogroa").val() * -1) / 100));
        }
    }

    $("#lblganavalor").html(numberFormat(z, 2));
    $("#lblganavaloraltabaja").html(numberFormat(z, 2));
});

function numberFormat(amount, decimals) {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0)
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
}


function abrir_modal_propuestacasa(id) {
    var elepostador;
    var eleccasa;
    var altabajax;
    var propuesta = $("#idcasapropuesta").val();
    var evento = $("#idcasaevento").val();

    if ($("#textmonto").val() <= 0) {
        $('#errortextmonto').html('El monto debe se mayor a cero!');
        $('#errortextmonto').show();
        return false;
    }

    if ($("#idclase").val() == 'a') {
        elepostador = $("#idelementoa").val();
        eleccasa = $("#idelementob").val();
        altabajax = "a";
    } else {
        elepostador = $("#idelementob").val();
        eleccasa = $("#idelementoa").val();
        altabajax = "b";
    }

    $('#btncan1').attr("disabled", false, "class", "btn  btn-default").html('Cancelar');
    if ($("#idllamado").val() == 'altabaja') {
        $("#input_modal_propuestacasa").html("<button type='button' id='btnconfir' onclick='apostar_comprapropuestacasaaltabaja(" + propuesta + "," + evento + "," + elepostador + "," + $("#textmonto").val() + ");' class='btn btn-primary'>Confirmar La Apuesta</button>");
    }

    if ($("#idllamado").val() == 'logros') {
        $("#input_modal_propuestacasa").html("<button type='button' id='btnconfir' onclick='apostar_propuestacasa(" + propuesta + "," + evento + "," + elepostador + "," + eleccasa + "," + $("#textmonto").val() + ");' class='btn btn-primary'>Confirmar La Apuesta</button>");
    }

    $('#modal_propuestacasa').modal('show');

    $("#idleyenda").html('<p>Su apuesta es de Bs:' + $("#textmonto").val() + ' Para Ganar Bs: ' + $("#lblganavalor").html() + '<p>');
}

function apostar_comprapropuestacasaaltabaja(propuesta, evento, elepostador, monto) {
    $("#mycontenido").attr("style", "text-align:center;")
    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    // crearpropuestacasaaltabaja

    $.post(caminotmp + "/cprincipal/crearpropuestacasaaltabaja", {
        "vidpropuesta": propuesta,
        "videvento": evento,
        "velepostador": elepostador,
        "vmonto": monto, //$("#textmonto").val(),
        "valtabaja": $("#idclase").val()
    },
        function (data) {
            if (data) {
                $("#idleyenda").html(' Su Apuesta ha sido registrada!!!');
                $('#btncan1').attr("class", "btn btn-primary");
                $('#btncan1').attr("disabled", false, "class", "btn btn-primary").html(' Ok');
                $("#modal_propuestacasa").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                var cadena = data.split("#");
                $('#idsaldo1').val(cadena[1]);
                $('#idsaldo').val(cadena[2]);
                $('#idsaldo1').html('<span> ' + cadena[1] + ' </span>');
                $('#idsaldo').html('<span>' + cadena[2] + ' </span>');
                ir_areasocial(idclx);
                $('#areaeventos').html('');
                $.post(caminotmp + "/cprincipal/cargarareaeventos", {
                    "vfecha": -1,
                    "vbuscar": -1,
                    "vcategoria": -1,
                    "vlugar": -1,
                    "vsubcategoria": -1
                },
                    function (data) {
                        if (data) {
                            $("#areaeventos").html(data).fadeIn('slow');
                            $("#idleyenda").html(' Su Apuesta ha sido registrada!!!');
                            $('#btncan1').attr("class", "btn btn-primary");
                            $('#btncan1').attr("disabled", false, "class", "btn btn-primary").html(' Ok');
                            $('#modal_propuestacasa').modal('show');
                        } else {
                            alert("error")
                        }
                    }
                )
            } else {
                alert("error")
            }
        }
    )
}

function ir_comprapropuestacasaaltabaja(rutaa, rutab, sel, descri1, descri2, altabaja, saldo, evento, propuesta, elementoa, elementob, altabajalo) {
    if (saldo <= 0) {
        $("#modal_sinsaldo").show();
        return false;
    }
    var signo = "+";
    if (altabaja < 0) { signo = ""; }
    if (descri1 == '' && descri2 == '') { return false; }
    $("#apuestaprocasa").show();
    $("#idimglogroa").attr("src", rutaa);
    $("#idimglogrob").attr("src", rutab);
    $("#lbl3").html(descri1);
    $("#lbl4").html(descri2);
    $("#idtrlogros").hide();
    $("#idtrbaja").show();
    if (altabaja > 0) { $("#idlblaltb").html(" La ALta (" + signo + altabaja + ") Del Juego (" + altabajalo + ") "); }
    if (altabaja < 0) { $("#idlblaltb").html(" La Baja (" + signo + altabaja + ") Del Juego (" + altabajalo + ") "); }
    $("#idllamado").val('altabaja');
    $("#idcasaevento").val(evento);
    $("#idcasapropuesta").val(propuesta);
    $("#idelementoa").val(elementoa);
    $("#idelementob").val(elementob);
    $("#idaltasbajas").val(altabaja);
    $("#idclase").val(sel);
    $("#textmonto").val('');

    $("#lblganaaltabaja").html('Su ganancia seria de :');
    $("#lblganavaloraltabaja").html('');

}
// modal_propuestacasa
// FUNCIONES DE VENTA DE PUESTOS
function abrir_modal_apuestapuestoventa(id) {
    // transformamos el monto
    var metodo = "modal_clientes_apuestapuestoventa";
    var montoval = DN($('#idmontolista').val());

    var mtoval = parseFloat(montoval);

    if (montoval == 0) {
        $("#botonera1").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido1").html('El monto es requerido!!');
        $('#modal_clientes_apuestapuestoventa').show();
        return false;
    }

    var pagopan = $('#idpagoven').val();
    var ganopan = $('#idganoven').val();
 //   var pagopan = $('#idganoven').val();
 //   var ganopan = $('#idpagoven').val();

  
 //     return false;
    var megan0 = (montoval * pagopan) / ganopan;
    var comi = (megan0 * $('#idcomision').val()) / 100;
    megan0 = megan0 - (megan0 * $('#idcomision').val()) / 100;
 // alert('pago '+pagopan+'  gano '+ganopan+' megano '+megan0);
    if (montoval == '' || montoval == ',') {
        $("#botonera1").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido1").html('El monto es requerido!!');
        $('#modal_clientes_apuestapuestoventa').show();
        return false;
    }

    if (solounacoma($('#idmontolista').val()) > 1 || $('#idmontolista').val() == "'") {

        $("#botonera1").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido1").html('El formato del monto es inavlido!!');
        $('#modal_clientes_apuestapuestoventa').show();
        return false;
    }

    $('#botonera1').html("");
    $("#botonera1").html("<div id='botok' class='modalb'  onclick='apostar_puestolista();'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");

    try {
        bonsal = $('#idsaldobono1 span').html().replace('.', "");
        bonsal = bonsal.replace(',', ".");
        if (bonsal > 0) {
            $("#botonera1").prepend(`
                <div style="float: left; padding: 3px;">
                    <input type="checkbox" value='false' id="cbox2" style="cursor: initial; display: inline-block;"><label for="cbox2">Utilizar Bono</label>
                </div>
            `);
        }
    } catch (error) { console.log('e') }

    $("#mycontenido1").html('Apuestas BS: ' + FN(mtoval) + ' Para ganar BS: ' + FN(megan0));
    $('#modal_clientes_apuestapuestoventa').show();
}

function apostar_puestolista(item) {
    $("#mycontenido").attr("style", "text-align:center;");

    var usabono = $("#cbox2").is(":checked");

    $("#botonera1").html('');
    $("#mycontenido1").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    var montoval = DN($('#idmontolista').val());
    var mtoval = parseFloat(montoval);

    $.post(caminotmp + "/apostar/Capostarpuestos/crearventa", {
        "videvento1": $('#idevento1').val(),
        "vidlemento1": $('#idlemento1').val(),
        "vidmontolista": mtoval,
        "vidfavcontra": $('#idfavcontra').val(),
        "vidpagoven": $('#idpagoven').val(),
        "vidganoven":  $('#idganoven').val(),
        "vidpuestoven": $('#idpuestoven').val(),
        "vidniniven": $('#idniniven').val(),
        "vidcompra": $('#idcompra').val(),
        "vidmontosagrupados": $('#idcompramontos').val(),
        "vdescriplugar": $('#descriplugar').text(),
        "vusabono": usabono,
        "page": mipagina,
        "vcategoria": micat,
        "vsubcategoria": misubcat,
        "vlugar": milugar
    },
        function (data) {
            if (data) {

                $("#bntcanpuestoven").hide();
                $("#lblganapuestoventa").html("");
                $("#lblganapuestoventamonto").html("");
                $("#lblganapuestoventamonto2").html("");
                $("#lblganapuestoventamonto3").html("");

                if (data == 90) {
                    $("#mycontenido1").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $("#botonera1").html("<div id='botcan' class='modalb' onclick='finalizarapostar_puestolistacancel();'>Cancelar</div>");
                    $('#modal_clientes_apuestapuestoventa').show();
                    return false;
                }

                if (data == 92) {
                    $("#mycontenido1").html("Estimado Cliente, elemento seleccionado fue retirado!!!");
                    $("#botonera1").html("<div id='botcan' class='modalb' onclick='finalizarapostar_puestolistacancel();'>Cancelar</div>");
                    $('#modal_clientes_apuestapuestoventa').show();
                    return false;
                }

                if (data == 99) {
                    $("#botonera1").html("<div id='botcan' class='modalb' onclick='finalizarapostar_puestolistacancel();'>Cancelar</div>");
                    $("#mycontenido1").html('Saldo insuficiente para a postar!!!');
                    $('#modal_clientes_apuestapuestoventa').show();
                    return false;
                }

                if (data == 98) {
                    $("#botonera1").html("<div id='botcan' class='modalb' onclick='finalizarapostar_puestolistacancel();'>Cancelar</div>");
                    $("#mycontenido1").html('El monto Apostado Supera a La Oferta ó la Oferta ya Fue vendida!!!');
                    $('#modal_clientes_apuestapuestoventa').show();
                    return false;
                }

                if (data == 89) {
                    $("#botonera1").html("<div id='botcan' class='modalb' onclick='finalizarapostar_puestolistacancel();'>Cancelar</div>");
                    $("#mycontenido1").html('El evento no esta disponible para Apostar!!!');
                    $('#modal_clientes_apuestapuestoventa').show();
                    return false;
                }

                $("#mycontenido1").html('Su Apuesta ha sido registrada!!!');
                $("#botonera1").html("<div id='botcan' class='modalb' onclick='finalizarapostar_puestolista(" + $('#idevento1').val() + ");'>Ok</div>");
                $('#modal_clientes_apuestapuestoventa').show();

            } else {
                alert("error");
            }
        }
    )
}

function finalizarapostar_puestolistacancel() {
    $('#modal_clientes_apuestapuestoventa').hide();
    /*	$("#modal_clientes_apuestapuestoventa").modal("hide");
    	$('body').removeClass('modal-open');
    	$('.modal-backdrop').remove();*/
    return false;
}

function finalizarapostar_puestolista(idevento0) {
    $('#modal_clientes_apuestapuestoventa').hide();
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/cprincipal/cargarareaeventoslista", {
        "vfecha": 0,
        "videvento": idevento0,
        "vbuscar": '',
        "vpagina": mipagina,
        "vcategoria": micat,
        "vsubcategoria": misubcat,
        "vlugar": milugar
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
                //	$('#loader').html('');
            } else {
                alert("error")
            }
        }

    )
    inferior = 0;
    ir_areasocial(idclx);
}
// FIN FUNCIONES DE VENTA DE PUESTOS

$("#idmonto").click(function (e) {
    $('#errorpruestasimple').hide();
    return false;
})
// FUNCIONES DE APUESTAS PROPOCISIONES MULTIPLES
function abrir_modal_apuestapropomultipleapostarChat(oferta, msg, evento) {

    var str = msg;
    var res = str.replace(/#/g, ",");
    var metodo = "modal_apostar_propuestamultiple";
    $('#botonera').html("");
    $("#botonera").html("<div id='botok' class='modalb'  onclick='ir_apostarproposicionmultipleapostarChat(" + oferta + "," + evento + ");'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");

    try {
        bonsal = $('#idsaldobono1 span').html().replace('.', "");
        bonsal = bonsal.replace(',', ".");
        if (bonsal > 0) {
            $("#botonera").prepend(`
                <div style="float: left; padding: 3px;">
                    <input type="checkbox" value='false' id="cbox2" style="cursor: initial; display: inline-block;"><label for="cbox2">Utilizar Bono</label>
                </div>
            `);
        }
    } catch (error) { console.log('e') }

    $("#mycontenido").html('<p> ' + res + '<p>');
    $('#modal_apostar_propuestamultiple').show();
}

function ir_apostarproposicionmultipleapostarChat(oferta, evento) {

    $("#mycontenido").attr("style", "text-align:center;");

    var usabono = $("#cbox2").is(":checked");


    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    var metodo = "modal_apostar_propuestamultiple";
    $.post(caminotmp + "/apostar/Ccreapropociones/crearventamultipleChat", {
        "voferta": oferta,
        "vusabono": usabono
    },
        function (data) {
            if (data) {

                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                if (data == 89) {
                    $("#mycontenido").html("El evento no esta disponible para Apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido").html("Estimado Cliente, su saldo es insuficiente para apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }
                if (data == 100) {
                    $("#mycontenido").html("Estimado Cliente, Disculpe no se pudo ubicar la Oferta!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                $("#botonera").html("<div id='botok' class='modalb'  onclick='finalizarapuestamultipeChat(" + evento + ");'>OK</div>");
                $("#mycontenido").html('Su apuesta ha sido registrada!!! ');
                $('#modal_apostar_propuestamultiple').show();

            } else {
                alert("error")
            }

        }
    )
    return false;

}

function finalizarapuestamultipeChat(evento) {
    $('#modal_apostar_propuestamultiple').hide();
    //ir_proposicionescrear(idevento, 1, 100)
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');

    $.post(caminotmp + "/apostar/Ccreapropociones/cargaDatos", {
        "videvento": evento,
        "vidclase": 1
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        })


    inferior = 0;
    ir_areasocial(idclx);
}

function abrir_modal_apuestapropomultipleapostar(idevento, idpropuesta, vidclase, salmonto, comision, salgano, resto) {
    var vganar = salmonto - ((salmonto * comision) / 100);

    var metodo = "modal_apostar_propuestamultiple";
    $('#botonera').html("");
    $("#botonera").html("<div id='botok' class='modalb'  onclick='ir_apostarproposicionmultipleapostar(" + idevento + "," + idpropuesta + "," + vidclase + "," + salgano + "," + comision + "," + resto + ");'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");

    try {
        bonsal = $('#idsaldobono1 span').html().replace('.', "");
        bonsal = bonsal.replace(',', ".");
        if (bonsal > 0) {
            $("#botonera").prepend(`
                <div style="float: left; padding: 3px;">
                    <input type="checkbox" value='false' id="cbox2" style="cursor: initial; display: inline-block;"><label for="cbox2">Utilizar Bono</label>
                </div>
            `);
        }
    } catch (error) { console.log('e') }

    $("#mycontenido").html('<p>Su apuesta es de Bs: ' + FN(salgano) + " Para Ganar Bs: " + FN(vganar) + '<p>');
    $('#modal_apostar_propuestamultiple').show();

}

function ir_apostarproposicionmultipleapostar(idevento, idpropuesta, vidclase, salmonto, comision, resto) {

    $("#mycontenido").attr("style", "text-align:center;");

    var usabono = $("#cbox2").is(":checked");

    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');

    var metodo = "modal_apostar_propuestamultiple";
    $.post(caminotmp + "/apostar/Ccreapropociones/crearventamultiple", {
        "videvento": idevento,
        "vidclase": vidclase,
        "vidpropuesta": idpropuesta,
        "vsalmonto": salmonto,
        "vdescriplugar": $("#descriplugar").text(),
        "vresto": resto,
        "vusabono": usabono
    },
        function (data) {
            if (data) {

                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                if (data == 89) {
                    $("#mycontenido").html("El evento no esta disponible para Apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido").html("Estimado Cliente, su saldo es insuficiente para apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_apostar_propuestamultiple').show();
                    return false;
                }

                //        		alert("Su Apuesta ha sido registrada!!!");
                //$("#bntcanmultiple").hide();
                //$("#idbodymodal2").html('<p>Su Apuesta ha sido registrada!!!</p>');
                //$("#input_modal_apuestapropomultipleapostar").html("<button type='button' onclick='finalizarapuestamultipe("+idevento+","+idpropuesta+","+vidclase+");' class='btn btn-primary'>OK</button>");
                //$('#botonera').html("");
                $("#botonera").html("<div id='botok' class='modalb'  onclick='finalizarapuestamultipe(" + idevento + "," + idpropuesta + "," + vidclase + ");'>OK</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
                $("#mycontenido").html('Su apuesta ha sido registrada!!! ');
                $('#modal_apostar_propuestamultiple').show();
                //$("#eventosxxx").html(data).fadeIn('slow');
                //ir_areasocial(idclx);
            } else {
                alert("error")
            }
        }
    )
    return false;
}

function finalizarapuestamultipe(idevento, idpropuesta, vidclase) {
    $('#modal_apostar_propuestamultiple').hide();
    ir_proposicionescrear(idevento, vidclase, 100)
    inferior = 0;
    ir_areasocial(idclx);
}
// FIN FUNCIONES DE APUESTAS PROPOCISIONES MULTIPLES

// FUNCIONES DE AOUESTAS PROPOSICIONES SIMPLE VENTA  hoy
function abrir_modal_apuestaproposimpleapostar(idevento, idcomprador, idvendedor, idelementocomprador, idelementovendedor, puntosdiferencial, montoapostado, vidclase, idpro, comision, montoaganar) {
    var metodo = "modal_venderpropuesta_simple";
    var vganar = montoaganar - ((montoaganar * comision) / 100);

    $('#botonera1').html("");
    $("#botonera1").html("<div id='botok1' class='modalb'  onclick='ir_compraproposicionsimpleapostar(" + idevento + "," + idcomprador + "," + idvendedor + "," + idelementocomprador + "," + idelementovendedor + "," + puntosdiferencial + "," + montoapostado + "," + vidclase + "," + idpro + ");'>Confirmar Apuesta</div><div id='botcan1' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");

    try {
        bonsal = $('#idsaldobono1 span').html().replace('.', "");
        bonsal = bonsal.replace(',', ".");
        if (bonsal > 0) {
            $("#botonera1").prepend(`
                <div style="float: left; padding: 3px;">
                    <input type="checkbox" value='false' id="cbox2" style="cursor: initial; display: inline-block;"><label for="cbox2">Utilizar Bono</label>
                </div>
            `);
        }
    } catch (error) { console.log('e') }

    $("#mycontenido1").html('<p>Su apuesta es de Bs: ' + FN(montoapostado) + " Para Ganar Bs:" + FN(vganar) + '<p>');
    $('#modal_venderpropuesta_simple').show();
}

function ir_compraproposicionsimpleapostar(idevento, idcomprador, idvendedor, idelementocomprador, idelementovendedor, puntosdiferencial, montoapostado, vidclase, idpro) {
    var metodo = "modal_venderpropuesta_simple";
    $("#mycontenido1").attr("style", "text-align:center;")

    var usabono = $("#cbox2").is(":checked");

    $("#botonera1").html('');
    $("#mycontenido1").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    $.post(caminotmp + "/apostar/Ccreapropociones/crearventa", {
        "videvento": idevento,
        "vidclase": vidclase,
        "vidcomprador": idcomprador,
        "vidvendedor": idvendedor,
        "videlementocomprador": idelementocomprador,
        "videlementovendedor": idelementovendedor,
        "vpuntosdiferencial": puntosdiferencial,
        "vmontoapostado": montoapostado,
        "vidclase": vidclase,
        "vidpro": idpro,
        "vdescriplugar": $("#descriplugar").text(),
        "vusabono": usabono
    },
        function (data) {
            if (data) {
                if (data == 90) {
                    $("#mycontenido1").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera1').html("");
                    $("#botonera1").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_venderpropuesta_simple').show();
                    return false;
                }
                if (data == 89) {
                    $("#mycontenido1").html("El evento no esta disponible para Apostar!!!");
                    $('#botonera1').html("");
                    $("#botonera1").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_venderpropuesta_simple').show();
                    return false;
                }


                if (data == 91) {
                    $("#mycontenido1").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera1').html("");
                    $("#botonera1").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_venderpropuesta_simple').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido1").html("Estimado Cliente, su saldo es insuficiente para apostar!!!");
                    $('#botonera1').html("");
                    $("#botonera1").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_venderpropuesta_simple').show();
                    return false;
                }
                // alert("ddd");
                $("#iddoy").val('');
                $("#idmonto").val('');
                //$("#idbodymodal1").html('<p>Su Apuesta ha sido registrada!!!');
                //$("#bntcansimple1").hide();
                //$("#input_modal_apuestaproposimpleapostar1").html("<button type='button' onclick='finalizarventaproposimple("+vidclase+","+idevento+");' class='btn btn-primary'>Ok</button>");
                //$("#eventosxxx").html(data).fadeIn('slow');
                $("#botonera1").html("<div id='botcan' class='modalb' onclick='finalizarventaproposimple(" + vidclase + "," + idevento + ");'>Ok</div>");
                $("#mycontenido1").html('Su Apuesta ha sido registrada!!!');
                $('#modal_venderpropuesta_simple').show();
            } else {
                alert("error")
            }
        }
    )
    return false;
}

function finalizarventaproposimple(vidclase, idevento) {

    //$("#modal_apuestaproposimpleaposta1r").modal("hide");
    //$('body').removeClass('modal-open');
    //$('.modal-backdrop').remove();
    ir_proposicionescrear(idevento, vidclase, 100)
    inferior = 0;
    ir_areasocial(idclx);
}

// FUNCIONES DE APUESTAS PROPOSICIONES SIMPLE VENTA 
function abrir_modal_apuestaproposimple(idevento, idelementoa, idelementob, vidclase, comision, descriplugar) {

    var metodo = "modal_comprarpropuesta_simple";

    if ($('#iddoy').val() == '') {
        //  $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        //  $("#mycontenido").html('Debe asignar la cantidad de puntos que da!!');
        //  $('#modal_comprarpropuesta_simple').show();
        //  return false;
        $('#iddoy').val(0);
    }

    if ($('#iddoy').val() == ',' || $('#iddoy').val() == "'") {
        $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido").html('La formato de los puntos dados es inavlido!!');
        $('#modal_comprarpropuesta_simple').show();
        return false;
    }

    if ($('#idmonto').val() == '' || $('#idmonto').val() == ',') {
        $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido").html('El monto es requerido!!');
        $('#modal_comprarpropuesta_simple').show();
        return false;
    }

    if (solounacoma($('#idmonto').val()) > 1 || $('#idmonto').val() == "'") {
        $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido").html('El formato del monto es inavlido!!');
        $('#modal_comprarpropuesta_simple').show();
        return false;
    }

    if (DN($("#idmonto").val()) == 0) {
        $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $("#mycontenido").html('El monto Apostar es requerido!!');
        $('#modal_comprarpropuesta_simple').show();
        return false;
    }

    var x = DN($("#idmonto").val());
    // var vganar = DN($("#idmonto").val()) - ((DN($("#idmonto").val()) * comision) / 100);
    //----------------
    var base = $('#proporcion').val();
    var myArray = base.split('#');
    var pagopan = myArray[0];
    var ganopan = myArray[1];
    var megan0 = (DN($("#idmonto").val()) * ganopan) / pagopan;

    var comi = (megan0 * comision) / 100;
    megan0 = megan0 - (megan0 * comision) / 100;
    //------------
    var vganar = megan0;
    $('#botonera').html("");
    $("#botonera").html("<div id='botok' class='modalb'  onclick='ir_compraproposicionsimple(" + idevento + "," + idelementoa + "," + idelementob + "," + vidclase + ");'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");

    try {
        bonsal = $('#idsaldobono1 span').html().replace('.', "");
        bonsal = bonsal.replace(',', ".");
        if (bonsal > 0) {
            $("#botonera").prepend(`
                <div style="float: left; padding: 3px;">
                    <input type="checkbox" value='false' id="cbox2" style="cursor: initial; display: inline-block;"><label for="cbox2">Utilizar Bono</label>
                </div>
            `);
        }
    } catch (error) { console.log('e') }

    $("#mycontenido").html('<p>Su apuesta es de Bs: ' + $("#idmonto").val() + " Para Ganar Bs: " + FN(vganar) + '<p>');
    $('#modal_comprarpropuesta_simple').show();
}


function ir_compraproposicionsimple(idevento, idelementoa, idelementob, vidclase) {
    var metodo = "modal_comprarpropuesta_simple";
    var base = $('#proporcion').val();
    var myArray = base.split('#');
    var pagopan = myArray[0];
    var ganopan = myArray[1];
    $("#mycontenido").attr("style", "text-align:center;")

    var usabono = $("#cbox2").is(":checked");

    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    $("#verlist").click();
    // alert("antes="+$('#iddoy').val());
    $.post(caminotmp + "/apostar/Ccreapropociones/crearcompra", {
        "videvento": idevento,
        "vidclase": vidclase,
        "videlementoa": idelementoa,
        "videlementob": idelementob,
        "videlementocompra": $("#elemento").val(),
        "vidmontocompra": DN($("#idmonto").val()),
        "viddoy": $('#iddoy').val(),
        "vdescriplugar": $("#descriplugar").text(),
        "vpagopan": pagopan,
        "vganopan": ganopan,
        "vusabono": usabono
    },
        function (data) {
            if (data) {
                //alert(data);
                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_comprarpropuesta_simple').show();
                    return false;
                }
                if (data == 89) {
                    $("#mycontenido").html("El evento no esta disponible para Apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_comprarpropuesta_simple').show();
                    return false;
                }

                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_comprarpropuesta_simple').show();
                    return false;
                }

                if (data == 99) {
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
                    $("#mycontenido").html('Saldo Insuficiente para Apostar!!!');
                    $('#modal_comprarpropuesta_simple').show();
                    return false;
                }

                $('#iddoy').val('');
                $('#idmonto').val('');
                //$("#idbodymodal4").html('<p>Su Apuesta ha sido registrada!!!');
                //alert("Su Apuesta ha sido registrada!!!");
                //$("#btncancomprasim").hide();
                //$("#input_modal_apuestaproposimple").html("<button type='button' onclick='ir_nuevapropuestaconsulta("+vidclase+","+idevento+");' class='btn btn-primary'>Ok</button>");
                //$("#eventosxxx").html(data).fadeIn('slow');
                //

                $("#botonera").html("<div id='botcan' class='modalb' onclick='ir_nuevapropuestaconsulta(" + vidclase + "," + idevento + ");'>Ok</div>");
                $("#mycontenido").html('Su Apuesta ha sido registrada!!!');
                $('#modal_comprarpropuesta_simple').show();

            } else {
                alert("error")
            }
        }
    )
}

function ir_nuevapropuestaconsulta(tipo, evento) {
    //	alert(tipo);
    //$("#modal_clientes_apuestaproposimple").modal("hide");
    //$('body').removeClass('modal-open');
    //$('.modal-backdrop').remove();
    $('#modal_comprarpropuesta_simple').hide();
    inferior = 0;
    ir_areasocial(idclx);
    if (tipo == 2) {
        $("#idlistapropo").hide();
        $("#idconfronta").show();

    }
    if (tipo == 1) {
        $("#idlistapropo").hide();
        $("#idselpropo1").show();
        $("#idpancombra").show();

    }
}
// PROPOCICIONES SIMPLES 

// fin area de modales
function ir_selecciopro_1() {

    var len = document.getElementById("idseleciona").length;

    var cadena = $("#idselecionopciones").val();
    cadena.split("#");
    var texto = "";
    if (len >= cadena[0]) {

        alert("Ya selecciono el tope de ejemplares");
        return false;
    }
    $("#idejemplares option:selected").each(function () {
        texto += $(this).val() + " - ";
        $("#idseleciona").append("<option value='" + $(this).val() + "' selected='selected'>" + $(this).text() + "</option>");
        $("#idejemplares").find("option[value='" + $(this).val() + "']").remove();
    }).trigger('change');
    if (texto == "") {
        alert("Debe seleccionar un ejemplar!!");
    }

}

function ir_limpia1() {
    $("#idseleciona option:selected").each(function () {
        //texto += $(this).val() + " - ";	
        $("#idejemplares").append("<option value='" + $(this).val() + "' selected='selected'>" + $(this).text() + "</option>");
        $("#idseleciona").find("option[value='" + $(this).val() + "']").remove();
    }).trigger('change');
}

function ir_selecciopro_2() {
    var len = document.getElementById("idselecionb").length;

    var cadena = $("#idselecionopciones").val();
    cadena.split("#");
    var texto = "";
    if (len >= cadena[2]) {

        alert("Ya selecciono el tope de ejemplares");
        return false;
    }
    var texto = "";
    $("#idejemplares option:selected").each(function () {
        texto += $(this).val() + " - ";
        $("#idselecionb").append("<option value='" + $(this).val() + "' selected='selected'>" + $(this).text() + "</option>");
        $("#idejemplares").find("option[value='" + $(this).val() + "']").remove();
    }).trigger('change');
    if (texto == "") {
        alert("Debe seleccionar un ejemplar!!");
    }

}

function ir_limpia2() {
    $("#idselecionb option:selected").each(function () {
        //texto += $(this).val() + " - ";	
        $("#idejemplares").append("<option value='" + $(this).val() + "' selected='selected'>" + $(this).text() + "</option>");
        $("#idselecionb").find("option[value='" + $(this).val() + "']").remove();
    }).trigger('change');
}

function ir_selecciopro_3() {
    var len = document.getElementById("idseleciona2").length;

    var cadena = $("#idselecionopciones").val();
    cadena.split("#");
    var texto = "";

    if (len >= cadena[4]) {

        alert("Ya selecciono el tope de ejemplares");
        return false;
    }
    var texto = "";
    $("#idejemplares option:selected").each(function () {
        texto += $(this).val() + " - ";
        $("#idseleciona2").append("<option value='" + $(this).val() + "' selected='selected'>" + $(this).text() + "</option>");
        $("#idejemplares").find("option[value='" + $(this).val() + "']").remove();
    }).trigger('change');
    if (texto == "") {
        alert("Debe seleccionar un ejemplar!!");
    }

}

function ir_limpia3() {
    $("#idseleciona2 option:selected").each(function () {
        //texto += $(this).val() + " - ";	
        $("#idejemplares").append("<option value='" + $(this).val() + "' selected='selected'>" + $(this).text() + "</option>");
        $("#idseleciona2").find("option[value='" + $(this).val() + "']").remove();
    }).trigger('change');
}
// combo de seleccion de opciones de jugadas
$("#idselecionopciones").change(function () {

    if ($("#idselecionopciones").val() == 0) {
        $("#iddetapro").hide();
        return false;
    }

    $("#iddetapro").hide();
    $("#idseleciona option:selected").each(function () {
        $("#idejemplares").append("<option value='" + $(this).val() + "' >" + $(this).text() + "</option>");
        $("#idseleciona").find("option[value='" + $(this).val() + "']").remove();
    }).trigger('change');

    $("#idselecionb option:selected").each(function () {
        $("#idejemplares").append("<option value='" + $(this).val() + "' >" + $(this).text() + "</option>");
        $("#idselecionb").find("option[value='" + $(this).val() + "']").remove();
    }).trigger('change');

    $("#idseleciona2 option:selected").each(function () {
        $("#idejemplares").append("<option value='" + $(this).val() + "' >" + $(this).text() + "</option>");
        $("#idseleciona2").find("option[value='" + $(this).val() + "']").remove();
    }).trigger('change');

    $("#iddetapro").show();

})

function ir_nuevapropuesta(tipo, evento) {

    if (tipo == 2) {
        $("#idlistapropo").hide();
        $("#idconfronta").show();
    }

    if (tipo == 1) {
        $("#idlistapropo").hide();
        $("#idselpropo1").show();
        $("#idpancombra").show();
    }

}

function retornalistpro(id) { // hpy
    $("#idconfronta").hide();
    $("#idselpropo1").hide();
    $("#idlistapropo").show();
}

function ir_retornapropolista(id) {
    $("#idselpropo1").hide();
    $("#idpancombra").hide();
    $("#iddetapro").hide();
    $("#idselecionopciones").val(0);
    $("#idlistapropo").show();
}
// procesar polla
function sumarelementopolla(subtotal, suma) {
    ttotalseT = 1;

    var ttotalseT = 0;
    var vtem1 = "#" + subtotal;
    var tvtem1 = parseInt($(vtem1).html());

    ttotalseT = 1;

    if (suma == 1) {
        tvtem1 = tvtem1 + 1;
    } else {
        tvtem1 = tvtem1 - 1;
    }

    $(vtem1).html(tvtem1);

    var selected = '';
    var totsel = 0;

    $('#tablatitulo label').each(function () {
        var str = $(this).prop("id");
        var res = str.substring(0, 4);

        if (res == 'sel_') {
            selected += $(this).prop("id") + ', ';
            var vtem11 = "#" + str;
            if (parseInt($(vtem11).html()) > 0) {
                ttotalseT = ttotalseT * parseInt($(vtem11).html());
                totsel = totsel + 1;
            }
        }
    });

    if (totsel > 0) {
        var tbolivares = DN($('#idmontopreciopolla').val()) * ttotalseT;

        $('#totalseT').html(ttotalseT);
        $('#idmontocantidadpolla').val(ttotalseT);

        $('#idmontoapuestapolla').val(FN(tbolivares));
        $('#idmontoapuestapollaocul').val(tbolivares);

    } else {
        $('#totalseT').html(0);
        $('#idmontocantidadpolla').val(FN(0));
        $('#idmontoapuestapolla').val(FN(0));
        $('#idmontoapuestapollaocul').val(0);
    }

}

$('#errorpolla').click(function (e) {
    $("#errorpolla").hide();
});

// FUNCIONES DE APUESTAS DE QUINIELAS
function abrir_modal_apuestapollaquiniela(idpolla) {
    var metodo = "modal_clientes_apuestapolla";
    var tpartidos = 0;
    var tpartidoserror = 0;

    $('#tablatitulo').find(':input').each(function () {
        var str = $(this).prop("id");
        var res = str.substring(0, 10);
        if (res == 'elementoa_' || res == 'elementob_') {
            var vtem11 = "#" + str;
            tpartidos = tpartidos + 1;
            if ($(vtem11).val() == '') {
                $('#errorpolla').html('Faltan Jugadas por cargar se deben colocar resultados en todos los partidos de la quiniela !!!');
                $("#errorpolla").show();
                tpartidoserror = tpartidoserror + 1;
            }
        }

        if (tpartidoserror > 0) {
            return false;
        }

//        $("#mycontenido").html('<p>Su apuesta es de Bs: ' + $('#idmontoapuestapolla').val() + " Para Ganar Bs: " + FN($('#mipremiooculto').val()) + '<p>');
        $("#mycontenido").html('<p>Su apuesta es de Bs: ' + $('#idmontoapuestapolla').val() +  '<p>');

        $("#botonera").html("<div id='botok' class='modalb' onclick='apostar_pollaquinielapartidos(" + idpolla + ");'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
        $('#modal_clientes_apuestapolla').show();

    });

}

function apostar_pollaquinielapartidos(idpolla) {
    $("#mycontenido").attr("style", "text-align:center;")
    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');
    var evento = "";
    var fila = "";
    var elementoa = "";
    var elementob = "";
    var elementovalora = "";
    var elementovalorb = "";

    $('#tablatitulo').find(':input').each(function () {
        var str = $(this).prop("id");
        var res = str.substring(0, 10);
        if (res == 'elementoa_' || res == 'elementob_') {
            var valData = $(this).prop("id");
            var valNew = valData.split('_');
            if (res == 'elementoa_') {
                fila += valNew[1] + "#";
                evento += valNew[2] + "#";
                elementoa += valNew[3] + "#";
                var elvarlosa = "#" + str;
                elementovalora += $(elvarlosa).val() + "#";
            }
            if (res == 'elementob_') {
                elementob += valNew[3] + "#";
                var elvarlosb = "#" + str;
                elementovalorb += $(elvarlosb).val() + "#";
            }
        }
    });

    $.post(caminotmp + "/apostar/Capostarpollas/crearapuestapollaquiniela", {
        "vidpolla": idpolla,
        "vevento": evento,
        "velementoa": elementoa,
        "velementob": elementob,
        "velementovalora": elementovalora,
        "velementovalorb": elementovalorb,
        "vmonto": DN($('#idmontoapuestapolla').val()),
        "vdescriplugar": $("#descriplugar").text()
    },
        function (data) {
            if (data) {

                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapolla').show();
                    return false;
                }

                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapolla').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido").html("Saldo Insuficiente para Apostar!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapolla').show();
                    return false;
                }

                $("#mycontenido").html('<p>Su Apuesta ha sido registrada!!!');
                $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + 'modal_clientes_apuestapolla' + "&#39;);'>Ok</div>");
                $('#modal_clientes_apuestapolla').show();

                $("#eventosxxx").html(data).fadeIn('slow');
                inferior = 0;
                ir_areasocial(idclx);

            } else {
                alert("error");
            }
        }
    )
}

// FIN apostar_pollaquinielapartidos
// FUNCIONES DE APUESTAS DE POLLAS

function ir_pollas(idpolla, saldo, depositos) {
    var retdepositos = parseFloat(depositos);
    var retsaldo = parseFloat(saldo);
    //$("#apuestaprocasa").hide();
    if (retsaldo <= 0) {

        $("#mycontenidosinsaldo").html("");
        $("#mycontenidosinsaldo").html("Estimado Cliente su saldo es insuficiente para apostar!!!");
        $("#modal_sinsaldo").show();
        return false;
    }
    /*
    if(retdepositos<=0){
    	
    	$("#mycontenidosinsaldo").html("");
    	$("#mycontenidosinsaldo").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
    	$("#modal_sinsaldo").show();
    	return false;
    }*/
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/apostar/Capostarpollas/cargaDatos", {
        "vidpolla": idpolla
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
                //	$('#loader').html('');
            } else {
                alert("error")
            }
        }

    )
}

function abrir_modal_apuestapolla(idpolla) {
    var metodo = "modal_clientes_apuestapolla";
    var tcarrera = 0;
    var tcarreraerror = 0;
    $('#tablatitulo label').each(function () {
        var str = $(this).prop("id");
        var res = str.substring(0, 4);
        if (res == 'sel_') {
            var vtem11 = "#" + str;
            tcarrera = tcarrera + 1;
            if (parseInt($(vtem11).html()) <= 0) {
                var diserr = "#" + str.substring(0, 3) + 'x_' + str.substring(4, 20);
                $('#errorpolla').html('La ' + $(diserr).html() + ' de la polla debe tener al menos un ejemplar seleccionado!!!');
                $("#errorpolla").show();
                tcarreraerror = tcarreraerror + 1;
                return false;
            }
        }
    });

    if (tcarreraerror > 0) {
        return false;
    }

    var nuevopremio = 0;
    nuevopremio = ($('#idmontoapuestapollaocul').val() * $('#pocentajepremiohide').val()) / 100;
    montoapostadogen = parseFloat($("#mtoaganarhide").val()) + parseFloat(nuevopremio);

//    $("#mycontenido").html('<p>Su apuesta es de Bs: ' + $('#idmontoapuestapolla').val() + " Para Ganar Bs: " + FN(montoapostadogen) + '<p>');
    $("#mycontenido").html('<p>Su apuesta es de Bs: ' + $('#idmontoapuestapolla').val()  + '<p>');
    $("#botonera").html("<div id='botok' class='modalb' onclick='apostar_pollaejemplares(" + idpolla + ",0);'>Confirmar Apuesta</div><div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Cancelar</div>");
    $('#modal_clientes_apuestapolla').show();
}

function apostar_pollaejemplares(idpolla, id2) {
    $("#mycontenido").attr("style", "text-align:center;")
    $("#botonera").html('');
    $("#mycontenido").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity; ">');

    var metodo = "modal_clientes_apuestapolla";
    var selected = "";
    var evento = "";
    var puesto = "";
    var elemento = "";
    var carrera = "";

    $('#tablatitulo input[type=checkbox]').each(function () {
        if (this.checked) {
            selected += $(this).prop("id") + ', ';
            var valData = $(this).prop("id");
            var valNew = valData.split('_');
            evento += valNew[1] + "#";
            puesto += valNew[2] + "#";
            elemento += valNew[3] + "#";
            carrera += valNew[4] + "#";
        }
    });

    $('#tablatitulo label').each(function () {
        var str = $(this).prop("id");
        var res = str.substring(0, 4);
        if (res == 'sel_') {
            //	alert($(this).prop("id"));
        }
    });

    $.post(caminotmp + "/apostar/Capostarpollas/crearapuestapolla", {
        "vidpolla": idpolla,
        "vevento": evento,
        "vpuesto": puesto,
        "velemento": elemento,
        "vcarreara": carrera,
        "vidmontocantidadpolla": $('#idmontocantidadpolla').val(),
        "vmonto": $('#idmontoapuestapollaocul').val(),
        "vdescriplugar": $("#descriplugar").text()
    },
        function (data) {
            if (data) {
                $("#btncanpolla").hide();

                if (data == 90) {
                    $("#mycontenido").html("El evento ya esta en progreso, No es posible Realizar la Apuesta!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapolla').show();
                    return false;
                }

                if (data == 91) {
                    $("#mycontenido").html("Estimado Cliente, para poder apostar debe realizar un deposito!!!");
                    $('#botonera').html("");
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='$(this).parent().parent().parent().parent().parent().parent().hide();'>OK</div>");
                    $('#modal_clientes_apuestapolla').show();
                    return false;
                }

                if (data == 99) {
                    $("#mycontenido").html('Saldo Insuficiente para Apostar!!!');
                    $("#botonera").html("<div id='botcan' class='modalb' onclick='ocultarmodal(" + "&#39;" + metodo + "&#39;);'>Ok</div>");
                    $('#modal_clientes_apuestapolla').show();
                    return false;
                }

                $("#mycontenido").html('Su Apuesta ha sido registrada!!!');
                $("#botonera").html("<div id='botcan' class='modalb' onclick='finalizarapostar_pollaejemplares(" + idpolla + ",0);'>Ok</div>");
                $('#modal_clientes_apuestapolla').show();

            } else {
                alert("error");
            }
        }
    )
}

function finalizarapostar_pollaejemplares(idpolla, id2) {
    $('#modal_clientes_apuestapolla').show();
    $('#eventosxxx').html('');
    $('#eventosxxx22').html('');
    $.post(caminotmp + "/apostar/Capostarpollas/cargaDatos", {
        "vidpolla": idpolla
    },
        function (data) {
            if (data) {
                $("#eventosxxx").html(data).fadeIn('slow');
            } else {
                alert("error")
            }
        }
    )
    inferior = 0;
    ir_areasocial(idclx);
}

$("input").attr("autocomplete", "off");
$("input").css("cursor", "initial");
if ($('#idsugerencias').html('<?php echo $descripcion;?>')) {
    $('#idsugerencias').attr('readonly');
}

function consultarresultados(ticket) {
    $.post(caminotmp + "/apostar/Cresultados/resultadoevento", {
        "ticket": ticket
    }, function (data) {
        if (data) {

            $("#contenido_resultados").html(data).fadeIn('slow');
            $('#modal_resultados').show();

        } else {

            alert("error");

        }
    })
}

function consultarresultadospollas(ticket) {
    $.post(caminotmp + "/apostar/Cresultados/resultadospollas", {
        "ticket": ticket
    }, function (data) {
        if (data) {

            $("#contenido_resultados").html(data).fadeIn('slow');
            $('#modal_resultados').show();

        } else {

            alert("error");

        }
    })
}

function consultarresultadosquinielas(ticket) {
    $.post(caminotmp + "/apostar/Cresultados/resultadoquiniela", {
        "ticket": ticket
    }, function (data) {
        if (data) {

            $("#contenido_resultados").html(data).fadeIn('slow');
            $('#modal_resultados').show();

        } else {

            alert("error");

        }
    })
}

function mostrarreenviarcorreo() {
    $.post(caminotmp + "/Cprincipal/cargarreenviarcorreo", {
        vcliente: $('#nombre_usuario').val()
    }, function (data) {
        if (data) {
            $('#alertemail').html(data);
        } else {
            alert("error");
        }
    })
}


function consulta_contrasena() {

    var value = $("#pcnew").val();

    if (value == 1) {
        var contra = $("#contraseñaconfi").val();
        var pc = $("#prco").val();
        if ($("#contraseñaconfi").val() == "") {
            $('#error0').removeClass('Oppositivo');
            $('#error0').show();
            $('#error0').html("Por favor ingrese su contraseña");
            $("botonerasegu").css("display", "none");
            return false;
        }
        $(".seguridad_div").html('<img src="assets/media/gif/pananload.gif" style="width:100px; mix-blend-mode: luminosity">');
        $.post(caminotmp + "/clientes/Cclientes/consulta_contraseguridad", {
            "vcontrasena": contra,
            "vpc": pc
        }, function (data) {
            $(".seguridad_div").html('');
            $(".seguridad_div").html(data);
            $("#btnenviacontra").css("display", "inline-block");
        });
        console.log("Pasaste a la 1");
    }

}



function guadarcontra() {
    if ($("#nueva_clave1").val() == "") {
        $('#error0').show();
        $('#error0').addClass('Opnegativo');
        $('#error0').html('El Campo Nueva Contraseña es requerido!!');
        $("#nueva_clave1").focus();
        return false;
    }

    if ($("#nueva_clave1").val().length > 20) {
        $('#error0').show();
        $('#error0').addClass('Opnegativo');
        $('#error0').html('La Nueva Contraseña del usuario es demasiado larga máximo 10 caracteres!!');
        $("#nueva_clave1").focus();
        return false;
    }

    if ($("#nueva_clave1").val().length < 6) {
        $('#error0').show();
        $('#error0').addClass('Opnegativo');
        $('#error0').html('La Nueva Contraseña del usuario es demasiado corta mínimo 6 caracteres!!');
        $("#nueva_clave1").focus();
        return false;
    }

    regexpass = new RegExp(/[¡¨!^&*()+|~=`{}\[\]:";'<>?,\/]|[^0-9A-z_$#.%@-]/, 'g');

    if (regexpass.test($("#nueva_clave1").val())) {
        $('#error0').show();
        $('#error0').addClass('Opnegativo');
        $('#error0').html('La Nueva Contraseña del usuario solo puede contener letras, numero y los siguientes caracteres : "_ $ # . % @ - " !!');
        $("#nueva_clave1").focus();
        return false;
    }

    if ($("#nueva_clave2").val() == "") {
        $('#error0').show();
        $('#error0').addClass('Opnegativo');
        $('#error0').html('El Campo Repetir Contraseña es requerido!!');
        $("#nueva_clave2").focus();
        return false;
    }

    if ($("#nueva_clave2").val() != $("#nueva_clave1").val()) {
        $('#error0').show();
        $('#error0').addClass('Opnegativo');
        $('#error0').html('Las Contraseñas no Coinciden!');
        return false;
    }
    $.post(caminotmp + "/clientes/Cclientes/CambioContra", {
        "vclave": $("#nueva_clave2").val()
    },
        function (data) {
            if (data == 1) {
                $("#btnoculta").click();
                $('#error0').show();
                $('#error0').addClass('Oppositivo');
                $("#error0").html("Se ha cambiado con exito su contraseña");
                $("#btnenviacontra").css("display", "none");
            }
            if (data) {
                $(".seguridad_div").html('');
                $(".seguridad_div").html(data);
            }
        })

}

function guadarpregu() {
    $.post(caminotmp + "/clientes/Cclientes/Guarda_Pregunta_Seguridad", {
        "vaccion": 1,
        "vdocidentidad": $("#doc_identidad_ident").val() + DN($("#doc_identidad").val()),
        "vusuarionickname": $("#nickname_cliente").val(),
        "vpregunta1": $("#pregunta1").val(),
        "vpregunta2": $("#pregunta2").val(),
        "vrespuesta1": $("#respuesta1 ").val(),
        "vrespuesta2": $("#respuesta2").val()
    },
        function (data) {
            if (data == 1) {
                $("#btnoculta").click();
                $('#error0').show();
                $('#error0').addClass('Oppositivo');
                $('#error0').html("Se ha cambiado con exito sus preguntas de seguridad");
                $("#btnenviacontra").css("display", "none");
            } else {
                alert("Error");
            }
        });
}

function asignar_nick_chat(nick) {
    $('#nicknameprivado').val(nick);
}