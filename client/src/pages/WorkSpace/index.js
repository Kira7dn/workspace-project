// import WorkSpace from '~/components/layout/components/Space'
import addIcon from "~/assets/img/svg/plus-circle-fill.svg";
import styles from "./SpaceList.module.css";

const spaces = [
  {
    id: "6205c804fb1ae19e0d0aecbc",
    title: "ETF đang nắm giữ bao nhiêu cổ phiếu VIC?",
    description:
      "Trong nhiều năm qua, VinGroup (Mã CK: VIC) luôn là một trong những doanh nghiệp vốn hóa lớn nhất thị trường chứng khoán Việt Nam. Với mức độ ảnh hưởng lớn tới thị trường nên hầu hết các quỹ đầu tư tại Việt Nam đều phân bổ danh mục vào VIC, đặc biệt các quỹ ETF",
    image:
      "https://danviet.mediacdn.vn/thumb_w/650/296231569849192448/2021/7/12/vinfast-lux-a20-mat-gia-bao-nhieu-sau-2-nam-danvietvn-6-1626092240739163433379.jpg",
    rank: 4,
    user: "61d94c79ed54d638458da0a0",
    members: [
      {
        id: "61d067dc596cdedd21b5b8e8",
        avatar:
          "https://media.vov.vn/sites/default/files/styles/large/public/2020-09/president_1.jpg",
        fullname: "Le Duc Anh Kiet",
      },
      {
        id: "61d0684b256cc4fc8206eefc",
        avatar:
          "https://blog.tomorrowmarketers.org/wp-content/uploads/2021/05/2-01.jpg",
        fullname: "Hoàng Xuân Hiệp",
      },
      {
        id: "61d12cb394fb3a314519d9c6",
        avatar:
          "https://img1.oto.com.vn/crop/762x429/2022/07/06/AJxaR32b/uu-dai-vinfast-thang-7-6503.jpg",
        fullname: "Đặng Thủy",
      },
    ],
  },
  {
    id: "6205c804fb1ae19e0d0adcbc",
    title: "ETF đang nắm giữ bao nhiêu cổ phiếu VIC?",
    description:
      "Trong nhiều năm qua, VinGroup (Mã CK: VIC) luôn là một trong những doanh nghiệp vốn hóa lớn nhất thị trường chứng khoán Việt Nam. Với mức độ ảnh hưởng lớn tới thị trường nên hầu hết các quỹ đầu tư tại Việt Nam đều phân bổ danh mục vào VIC, đặc biệt các quỹ ETF",
    image:
      "https://znews-photo.zingcdn.me/w660/Uploaded/dqvpxpck/2022_04_08/VinFast_VF8_zing_1.jpg",
    rank: 4,
    user: "61d94c79ed54d638458da0a0",
    members: [
      {
        id: "61d067dc596cdedd21b5b8e8",
        avatar:
          "https://img1.oto.com.vn/crop/762x429/2022/07/06/AJxaR32b/uu-dai-vinfast-thang-7-6503.jpg",
        fullname: "Le Duc Anh Kiet",
      },
      {
        id: "61d0684b256cc4fc8206eefc",
        avatar:
          "https://media.vov.vn/sites/default/files/styles/large/public/2020-09/president_1.jpg",
        fullname: "Hoàng Xuân Hiệp",
      },
      {
        id: "61d12cb394fb3a314519d9c6",
        avatar:
          "https://media.vov.vn/sites/default/files/styles/large/public/2020-09/president_1.jpg",
        fullname: "Đặng Thủy",
      },
    ],
  },
];
function WorkSpace() {
  return (
    <div className="pt-5">
      <div className="mt-5">
        {spaces.map((space) => {
          const { id, title, description, image, members } = space;
          return (
            <div key={id} className="mb-2">
              <div
                className={`shadow p-3 ${styles.spaceItem}`}
                border="primary"
                style={{
                  cursor: "default",
                }}
              >
                <div>
                  <div className="col-12">
                    <h6 className={styles.spacetitle}>{title}</h6>
                  </div>
                </div>
                <div>
                  <div className="align-items-center">
                    <img
                      src={image}
                      className={`${styles.spaceimg} img-fluid`}
                      alt="img"
                    />
                  </div>
                  <div className="align-middle"></div>
                </div>
                <div className="">
                  <p className={styles.spacedesc}>{description}</p>
                </div>
                <div>
                  <p className="mb-0">{`Team (${members.length})`}</p>

                  <span className={`${styles.teamlist}`}>
                    {members.map((member) => {
                      return (
                        <span key={member.id} className={styles.memberinfo}>
                          <img
                            src={member.avatar}
                            className={styles.memberavatar}
                            alt=""
                          />
                          <div className={styles.membername}>
                            {member.fullname}
                          </div>
                        </span>
                      );
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="mb-2">
          <div className={styles.addBtn}>
            <img src={addIcon} alt="add-space" className={styles.addBtnIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
