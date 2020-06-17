function cambiarAPASS(e) {
	if (e.keyCode == 13) {
		$("#contrasena").focus();
		return false;
	}
}

function iniciarEnter(e) {
	if (e.keyCode == 13) {
		$("#iniciar_sesion").click();
		return false;
	}
}