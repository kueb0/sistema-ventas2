import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../shared/models/usuario.interface';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private dialog: MatDialog) {
    
  }


  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: String[] = ['nombre', 'apellidos', 'username', 'rol', 'acciones'];

  usuarios: Usuario[] = [
    {cveUsuario: 1, nombre: 'Sandra', apellidos: 'Alvarez', username: 'karisa', rol: 'admin'},
    {cveUsuario: 2, nombre: 'Karina', apellidos: 'Gonzalez', username: 'hola', rol: 'ventas'}
  ]

  ngOnInit(): void {
      this.dataSource.data= this.usuarios;
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  onOpenModal(user = {}) {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      maxWidth: '100%',
      width: '80%',
      data: {
        user
      }
    })
  }

  ngOnDestroy(): void {
      
  }
}
