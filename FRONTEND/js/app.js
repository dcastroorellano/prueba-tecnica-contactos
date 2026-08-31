const API_URL = "http://localhost:3000/api/contactos";

let contactosActuales = [];

function validarContacto(contacto) {
  if (!contacto.tipoIdentificacion) {
    alert("Debe seleccionar el tipo de identificación.");
    return false;
  }

  if (!contacto.identificacion.trim()) {
    alert("La identificación es obligatoria.");
    return false;
  }

  if (!contacto.nombres.trim()) {
    alert("Los nombres son obligatorios.");
    return false;
  }

  if (!contacto.apellido.trim()) {
    alert("El apellido es obligatorio.");
    return false;
  }

  if (!contacto.telefono) {
    alert("El teléfono es obligatorio.");
    return false;
  }

  if (!contacto.direccion.trim()) {
    alert("La dirección es obligatoria.");
    return false;
  }

  if (!contacto.correoElectronico.trim()) {
    alert("El correo electrónico es obligatorio.");
    return false;
  }

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!correoValido.test(contacto.correoElectronico)) {
    alert("Ingrese un correo electrónico válido.");
    return false;
  }

  return true;
}

function cargarContactos() {
  $.ajax({
    url: API_URL,
    method: "GET",
    success: function (contactos) {
      contactosActuales = contactos;

      const tabla = $("#tablaContactos");

      tabla.empty();

      if (contactos.length === 0) {
        tabla.append(`
                    <tr>
                        <td colspan="10" class="text-center text-muted">
                            No hay contactos registrados
                        </td>
                    </tr>
                `);

        return;
      }

      contactos.forEach(function (contacto) {
        tabla.append(`
                    <tr>
                        <td>${contacto.Id}</td>
                        <td>${contacto.TipoIdentificacion}</td>
                        <td>${contacto.Identificacion}</td>
                        <td>${contacto.Nombres}</td>
                        <td>${contacto.Apellido}</td>
                        <td>${contacto.Telefono}</td>
                        <td>${contacto.Direccion}</td>
                        <td>${contacto.CorreoElectronico}</td>
                        <td>
                            ${contacto.Cliente ? "Sí" : "No"}
                        </td>
                        <td>
                            <button
                                class="btn btn-sm btn-warning btn-editar"
                                data-id="${contacto.Id}"
                            >
                                Editar
                            </button>

                            <button
                                class="btn btn-sm btn-danger btn-eliminar"
                                data-id="${contacto.Id}"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `);
      });
    },
    error: function (xhr) {
      const mensaje = xhr.responseJSON?.mensaje;

      alert(mensaje || "No se pudieron cargar los contactos.");
    },
  });
}

function guardarContacto() {
  const id = $("#contactoForm").data("id");

  const contacto = {
    tipoIdentificacion: $("#tipoIdentificacion").val(),
    identificacion: $("#identificacion").val(),
    nombres: $("#nombres").val(),
    apellido: $("#apellido").val(),
    telefono: $("#telefono").val(),
    direccion: $("#direccion").val(),
    correoElectronico: $("#correoElectronico").val(),
    cliente: $("#cliente").is(":checked"),
  };

  if (!validarContacto(contacto)) {
    return;
  }

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  $.ajax({
    url: url,
    method: metodo,
    contentType: "application/json",
    data: JSON.stringify(contacto),
    success: function (respuesta) {
      alert(respuesta.mensaje);

      cancelarEdicion();

      cargarContactos();
    },
    error: function (xhr) {
      const mensaje = xhr.responseJSON?.mensaje;

      alert(
        mensaje ||
          (id
            ? "No se pudo actualizar el contacto."
            : "No se pudo registrar el contacto."),
      );
    },
  });
}

function cargarContactoEnFormulario(contacto) {
  $("#tipoIdentificacion").val(contacto.TipoIdentificacion);
  $("#identificacion").val(contacto.Identificacion);
  $("#nombres").val(contacto.Nombres);
  $("#apellido").val(contacto.Apellido);
  $("#telefono").val(contacto.Telefono);
  $("#direccion").val(contacto.Direccion);
  $("#correoElectronico").val(contacto.CorreoElectronico);
  $("#cliente").prop("checked", contacto.Cliente);

  $("#contactoForm").data("id", contacto.Id);

  $("#btnGuardar").text("Actualizar contacto");
  $("#btnCancelar").removeClass("d-none");

  $("html, body").animate(
    {
      scrollTop: $("#contactoForm").offset().top,
    },
    500,
  );
}

function cancelarEdicion() {
  $("#contactoForm")[0].reset();

  $("#contactoForm").removeData("id");

  $("#btnGuardar").text("Registrar contacto");
  $("#btnCancelar").addClass("d-none");
}

$(document).on("click", ".btn-editar", function () {
  const id = String($(this).data("id"));

  const contacto = contactosActuales.find(function (contacto) {
    return String(contacto.Id) === id;
  });

  if (contacto) {
    cargarContactoEnFormulario(contacto);
  }
});

$(document).on("click", ".btn-eliminar", function () {
  const id = $(this).data("id");

  const confirmar = confirm(
    "¿Está seguro de que desea eliminar este contacto?",
  );

  if (!confirmar) {
    return;
  }

  $.ajax({
    url: `${API_URL}/${id}`,
    method: "DELETE",
    success: function (respuesta) {
      alert(respuesta.mensaje);

      cargarContactos();
    },
    error: function (xhr) {
      const mensaje = xhr.responseJSON?.mensaje;

      alert(mensaje || "No se pudo eliminar el contacto.");
    },
  });
});

$(document).ready(function () {
  cargarContactos();

  $("#contactoForm").on("submit", function (event) {
    event.preventDefault();

    guardarContacto();
  });

  $("#btnCancelar").on("click", function () {
    cancelarEdicion();
  });

  $("#btnActualizar").on("click", function () {
    cargarContactos();
  });
});
