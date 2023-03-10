import { all } from 'axios';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { history } from '../../util/history';
import { STATUS_CODE } from '../../util/settings/config';
import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from '../types/QuanLyPhimType';

export const layDanhSachPhimAction = (tenPhim = '') => {
	return async dispatch => {
		try {
			const { status, data } = await quanLyPhimService.layDanhSachPhim(tenPhim);
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_DANH_SACH_PHIM,
					arrFilm: data.content,
				});
			}
		} catch (err) {
			alert(err);
		}
	};
};

export const layDanhSachPhimDangChieu = () => {
	return {
		type: SET_PHIM_DANG_CHIEU,
	};
};

export const layDanhSachPhimSapChieu = () => {
	return {
		type: SET_PHIM_SAP_CHIEU,
	};
};

export const themPhimUploadHinhAction = formData => {
	return async dispatch => {
		try {
			const { status } = await quanLyPhimService.themPhimUploadHinh(formData);

			if (status === STATUS_CODE.SUCCESS) {
				alert('Thêm phim thành công!');
			}
		} catch (err) {
			alert(err);
		}
	};
};

export const capNhatPhimUploadAction = formData => {
	return async dispatch => {
		try {
			const { status } = await quanLyPhimService.capNhatPhimUpload(formData);
			if (status === STATUS_CODE.SUCCESS) {
				alert('Cập nhật phim thành công!');
				dispatch(layDanhSachPhimAction());
				history.push('/admin/films');
			}
		} catch (err) {
			alert(err);
		}
	};
};

export const layThongTinPhimAction = maPhim => {
	return async dispatch => {
		try {
			const { status, data } = await quanLyPhimService.layThongTinPhim(maPhim);

			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_THONG_TIN_PHIM,
					thongTinPhim: data.content,
				});
			}
		} catch (err) {
			alert(err);
		}
	};
};

export const xoaPhimAction = maPhim => {
	return async dispatch => {
		try {
			const { status } = await quanLyPhimService.xoaPhim(maPhim);

			if (status === STATUS_CODE.SUCCESS) {
				alert('Xóa phim thành công !');
				dispatch(layDanhSachPhimAction());
			}
		} catch (err) {
			alert(err);
		}
	};
};
