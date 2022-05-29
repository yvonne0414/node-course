import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StockDetails = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const stockId = useParams().stockId;
  // console.log('stockId', stockId);
  useEffect(() => {
    let getStocks = async () => {
      let res = await axios.get(`http://localhost:3001/stockDetails/${stockId}`, {
        params: {
          page: page,
        },
      });
      setStockDetails(res.data.data);
      setLastPage(res.data.pagination.lastPage);
      setTotal(res.data.pagination.total);
      // console.log(res.data);
    };
    getStocks();
  }, [stockId, page]);
  // console.log('page', page);
  const getPages = () => {
    let pages = [];
    // console.log('page', page, typeof page);
    for (let i = 1; i <= lastPage; i++) {
      // console.log('i', i, typeof i);
      if (i === Number(page)) {
        pages.push(
          <li className="pageItem active" key={i}>
            {i}
          </li>
        );
      } else {
        pages.push(
          <li className="pageItem" key={i} onClick={(e) => setPage(i)}>
            {i}
          </li>
        );
      }
    }
    return pages;
  };
  return (
    <div>
      <div className="flex justify-between items-center m-6">
        {/* <input type="number" name="" id="" value={pageto} onChange={(e) => setPageto(e.target.value)} /> */}
        <ul className="flex items-center">{getPages()}</ul>
        <div className="text-right">
          {page}/{lastPage}頁，共{total}筆
        </div>
      </div>

      {stockDetails.map((detail) => {
        return (
          <div key={detail.date} className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{detail.date}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：{detail.amount}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：{detail.volume}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：{detail.open_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：{detail.close_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：{detail.delta_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：{detail.high_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：{detail.low_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：{detail.transactions}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default StockDetails;
