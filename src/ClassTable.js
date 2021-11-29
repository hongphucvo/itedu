import React  from 'react';
import { Container} from 'reactstrap';
import axios from 'axios';
import { Modal } from 'reactstrap';
import { Input } from 'reactstrap';
import { CardHeader } from 'reactstrap';


const ClassTable = () => {

  const [data, setData] = useState([]);
  const [insertClass, setInsertClass] = useState(false);
  const [modal, setModal] = useState(false);
  const [insertLich, setInsertLich] = useState(false);
  const [modalLich, setModalLich] = useState(false);
  var newClass = {};
  var newLich = {};
  const checkData = () => {
    axios.get('http://localhost:8080/get/lophocphan').then(res => {
      setData(res.data.result);
    }
    ).then(() => setDisplay(data));
  }
  useEffect(() => {
    setTimeout(() => {
      checkData();
    }, 100);
  }, []);
  toggleInsert = () => {
    setInsertClass(!insertClass);
    toggleModal();
  }
  toggleInsertLich = () => {
    setInsertLich(!insertLich);
    toggleModalLich();
  }
  toggleModal = () => {
    setModal(!modal);
  }
  toggleModalLich = () => {
    setModalLich(!modalLich);
  }
  subnewLich = () => {
    axios.post('/insert/lichthi', { params: newLich }).then(() =>
      checkData())
  }
  editLich = () => {
    axios.post('/update/lichthi', { params: newLich }).then(() =>
      checkData())
  }
  submitClass = () => {
    axios.post('/insert/lophocphan', { params: newClass }).then(() =>
      checkData())
  }
  editClass = () => {
    axios.post('/update/lophocphan', { params: newClass }).then(() =>
      checkData())
  }
  const [mode, setMode] = useState(false);
  const columns = [
    { title: "Mã số lớp", filed: "id_lop" },
    { title: "Học kì", field: "hocki", type: "text" },
    { title: "Mã môn học", field: "id_monhoc", type: "text" },
    { title: "Tên lớp", field: "ten" },
  ];

  const columns2 = [
    { title: "Mã số lớp", filed: "id_lop" },
    { title: "Học kì", field: "hocki", type: "text" },
    { title: "Mã môn học", field: "id_monhoc", type: "text" },
    { title: "Tên lớp", field: "ten" },
    { title: "Số sinh viên hiện có", field: "sinhviendangki" },
    { title: "Ngày thi", field: "time" },
    { title: "Phòng thi", field: "time" },
  ];
  return (
    <Container >
      <Sidebar type={2} />
      <Row><Col xs={1} />
        <Col>
          {/* <Button className='addCartItem' onClick={toggleOnlyFb}>Chỉ xem FeedBack</Button> */}
          <MaterialTable style={{ zIndex: 0 }}
            options={{
              search: true,
              exportButton: true,
              grouping: group,
              sorting: true
            }}
            actions={[
              {
                icon: FaEdit,
                tooltip: "Chỉnh chi tiết",
                onClick: (event, rowData) => { newClass = rowData; toggleInsert(); },
              }, {
                icon: FaEdit,
                tooltip: mode ? "Xem lịch thi" : "Chỉnh sửa lịch thi",
                onClick: (event, rowData) => { if (mode) { setMode(!mode); } else { newLich = rowData; toggleInsertLich(); } },
              },
              {
                icon: tableIcons.Add,
                tooltip: "Groupby",
                isFreeAction: true,
                onClick: (event) => toggleGroup(),
              },
            ]}
            columns={(mode) ? columns : columns2}
            data={data}
            title="Quản lý lớp học phần"
          />
          <button class='chanh-button-view' type="button" onClick={toggleInsert}>Thêm lớp học phần</button>
        </Col>
        <Modal isOpen={insertClass} toggle={toggleInsert}>
          <CardHeader>Lớp học phần</CardHeader>
          Mã lớp học
          <Input name="id_lop" onChange={(e) => { newClass.id_lop = e.target.value; }} required />
          Tên lớp
          <Input name="ten" onChange={(e) => { newClass.ten = e.target.value }} required />
          Học kì
          <Input name="hocki" onChange={(e) => { newClass.hocki = e.target.value; }} required />
          Môn học
          <Input name="id_monhoc" onChange={(e) => { newClass.id_monhoc = e.target.value }} required />
          Số sinh viên tối đa
          <Input name="sinhvientoida" onChange={(e) => { newClass.sinhvientoida = e.target.value }} required />
          (!insertClass)?
          <button class='chanh-button-view' type="button" onClick={submitClass}>Thêm mới</button>   :
          <button class='chanh-button-view' type="button" onClick={editClass}>Chỉnh sửa</button>

        </Modal>

        <Modal isOpen={insertLich} toggle={toggleInsertLich}>
          <CardHeader>Chỉnh sửa lịch thi</CardHeader>
          Phòng thi
          <Input name="phongthi" onChange={(e) => { newLich.ten = e.target.value }} required />
          Ngày thi
          <Input name="ngaythi" onChange={(e) => { newLich.ngaythi = e.target.value; }} required />
          Thời gian
          <Input name="thoigian" onChange={(e) => { newLich.thoigian = e.target.value }} required />
          (newLich.ngaythi)? <button class='chanh-button-view' type="button" onClick={editLich}>Chỉnh sửa</button> :    <button class='chanh-button-view' type="button" onClick={subnewLich}>Thêm mới</button>
        </Modal>
      </Row>

    </Container>
  )

}




export default ClassTable;