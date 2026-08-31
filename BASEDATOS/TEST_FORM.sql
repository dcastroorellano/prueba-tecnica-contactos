IF DB_ID('TEST_FORM') IS NULL
BEGIN
    CREATE DATABASE TEST_FORM;
END;
GO

USE TEST_FORM;
GO

IF OBJECT_ID('dbo.Contactos', 'U') IS NULL
BEGIN
    CREATE TABLE Contactos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        TipoIdentificacion VARCHAR(3) NOT NULL,
        Identificacion VARCHAR(20) NOT NULL,
        Nombres VARCHAR(50) NOT NULL,
        Apellido VARCHAR(50) NOT NULL,
        Telefono NUMERIC(10,0) NOT NULL,
        Direccion VARCHAR(120) NOT NULL,
        CorreoElectronico VARCHAR(120) NOT NULL,
        Cliente BIT NOT NULL
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_ConsultarContactos
AS
BEGIN
    SELECT
        Id,
        TipoIdentificacion,
        Identificacion,
        Nombres,
        Apellido,
        Telefono,
        Direccion,
        CorreoElectronico,
        Cliente
    FROM Contactos;
END;
GO

CREATE OR ALTER PROCEDURE sp_InsertarContacto
    @TipoIdentificacion VARCHAR(3),
    @Identificacion VARCHAR(20),
    @Nombres VARCHAR(50),
    @Apellido VARCHAR(50),
    @Telefono NUMERIC(10,0),
    @Direccion VARCHAR(120),
    @CorreoElectronico VARCHAR(120),
    @Cliente BIT
AS
BEGIN
    INSERT INTO Contactos (
        TipoIdentificacion,
        Identificacion,
        Nombres,
        Apellido,
        Telefono,
        Direccion,
        CorreoElectronico,
        Cliente
    )
    VALUES (
        @TipoIdentificacion,
        @Identificacion,
        @Nombres,
        @Apellido,
        @Telefono,
        @Direccion,
        @CorreoElectronico,
        @Cliente
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_EditarContacto
    @Id INT,
    @TipoIdentificacion VARCHAR(3),
    @Identificacion VARCHAR(20),
    @Nombres VARCHAR(50),
    @Apellido VARCHAR(50),
    @Telefono NUMERIC(10,0),
    @Direccion VARCHAR(120),
    @CorreoElectronico VARCHAR(120),
    @Cliente BIT
AS
BEGIN
    UPDATE Contactos
    SET
        TipoIdentificacion = @TipoIdentificacion,
        Identificacion = @Identificacion,
        Nombres = @Nombres,
        Apellido = @Apellido,
        Telefono = @Telefono,
        Direccion = @Direccion,
        CorreoElectronico = @CorreoElectronico,
        Cliente = @Cliente
    WHERE Id = @Id;
END;
GO

CREATE OR ALTER PROCEDURE sp_EliminarContacto
    @Id INT
AS
BEGIN
    DELETE FROM Contactos
    WHERE Id = @Id;
END;
GO