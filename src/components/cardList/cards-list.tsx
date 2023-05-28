import { OrderType } from '../../types/typeOrders'
import { cardPropsType } from '../../types/typesCards'
import CardRutas from '../generalCards/rutas-card'
import CardPedidos from '../generalCards/pedidos-card'
import CardRepartidor from '../generalCards/repartidor-card'
import './styles.css'
import Loading from '../atoms/loading'
import CardCliente from '../generalCards/cliente-card'
import { useState } from 'preact/hooks'

type CardListInterface = {
  data: any[]
  tipo: string
  variant?: string
  cardProps?: cardPropsType
  loading?: boolean
  activeItem?: string
  onClickItem: (item: OrderType | any) => void
}

export const CardList = ({
  data,
  tipo,
  cardProps,
  onClickItem,
  variant,
  loading,
  activeItem,
}: CardListInterface) => {
  const [searchRuta, setSearchRuta] = useState('')
  const [searchPedido, setSearchPedido] = useState('')
  const [searchRepartidor, setSearchRepartidor] = useState('')
  const [searchCliente, setSearchCliente] = useState('')

  if (loading) return <Loading />
  switch (tipo) {
    case 'pedidos':
      return (
        <div className='listContainer'>
          {data.map((item) => {
            return (
              <CardPedidos
                activeItem={activeItem}
                variant={variant}
                cardProps={cardProps}
                onClick={(item) => onClickItem && onClickItem(item)}
                data={item}
              />
            )
          })}
        </div>
      )
      break
    case 'rutas':

      return (
        <div className='listContainer'>
          <div className='searchContainer'>
            <input
              className='searchInput'
              type='text'
              placeholder='Buscar ruta'
              value={searchRuta}
              onChange={(e) => setSearchRuta(e.currentTarget.value)}
            />
          </div>

          {data
            .filter((item) =>
              item.nombreRuta.toLowerCase().includes(searchRuta.toLowerCase().trim()),
            )
            .map((item) => {
              return (
                <CardRutas
                  data={item}
                  activeItem={activeItem}
                  cardProps={cardProps}
                  onClick={(item) => onClickItem && onClickItem(item)}
                />
              )
            })}
        </div>
      )
      break
    case 'repartidor':
      console.log(data);
      return (
        <div className='listContainer onboarding-item-repartidor'>
          <div className='searchContainer'>
            <input
              className='searchInput'
              type='text'
              placeholder='Buscar repartidor'
              value={searchRepartidor}
              onChange={(e) => setSearchRepartidor(e.currentTarget.value)}
            />
          </div>
          {data.filter((item) =>

            item.DatosPersonales.nombre.toLowerCase() || item.DatosPersonales.apellido.toLowerCase()
              .includes(searchRepartidor.toLowerCase().trim()),
          )

            .map((item) => {
              return (
                <CardRepartidor
                  activeItem={activeItem}
                  cardProps={cardProps}
                  onClick={(item) => onClickItem && onClickItem(item)}
                  data={item}
                />
              )
            })}
        </div>
      )
      break
    case 'cliente':
      return (
        <div className='listContainer'>
          {data.map((item) => {
            return (
              <CardCliente
                activeItem={activeItem}
                cardProps={cardProps}
                onClick={(item) => onClickItem && onClickItem(item)}
                data={item}
              />
            )
          })}
        </div>
      )
      break
    default:
      return <></>
      break
  }
}
