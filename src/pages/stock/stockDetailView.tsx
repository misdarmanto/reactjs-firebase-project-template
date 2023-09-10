import { useParams } from 'react-router-dom'
import MainLayout from '../../layout/mainLayout'
import { useEffect, useState } from 'react'
import { Collections, firebaseCRUD } from '../../firebase/firebaseFunctions'
import { type IStock } from '../../models/stock'
import { Breadcrumb } from '../../components/breadCumber'

const StockDetailView = (): JSX.Element => {
  const { stockId } = useParams()
  const [stock, setStock] = useState<IStock | any>()
  const navigation = [{ title: 'Detail', href: '', active: true }]

  const getStock = async (): Promise<void> => {
    if (stockId != null) {
      const result = await firebaseCRUD.getDocumentData({
        collectionName: Collections.STOCKS,
        documentId: stockId
      })
      setStock(result)
    }
  }

  useEffect(() => {
    void getStock()
  }, [])

  if (stock === null) return <div>Loading...</div>

  return (
    <MainLayout>
      <Breadcrumb title={'Stok Obat'} navigation={navigation} />
      <div className="mt-4  bg-white rounded-xl p-5 sm:p-10 w-full">
        <div className="flex gap-5 items-center my-2">
          <h3 className="text-lg font-semibold">Nama Obat : </h3>
          <p className="text-gray-800">{stock.namaObat}</p>
        </div>
        <div className="flex gap-5 items-center my-2">
          <h3 className="text-lg font-semibold">Nama BPF : </h3>
          <p className="text-gray-800">{stock.namaBPF}</p>
        </div>
        <div className="flex gap-5 items-center my-2">
          <h3 className="text-lg font-semibold">Jumlah : </h3>
          <p className="text-gray-800">{stock.total}</p>
        </div>
        <div className="flex gap-5 items-center my-2">
          <h3 className="text-lg font-semibold">Tgl Masuk : </h3>
          <p className="text-gray-800">{stock.tglMasuk}</p>
        </div>
        <div className="flex gap-5 items-center my-2">
          <h3 className="text-lg font-semibold">Tgl Expired : </h3>
          <p className="text-gray-800">{stock.tglExpired}</p>
        </div>
        <div className="flex gap-5 items-center my-2">
          <h3 className="text-lg font-semibold">Stok : </h3>
          <p className="text-gray-800">{stock.stock}</p>
        </div>
        <div className="flex gap-5 items-center my-2">
          <h3 className="text-lg font-semibold">Batch : </h3>
          <p className="text-gray-800">{stock.batch}</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default StockDetailView
