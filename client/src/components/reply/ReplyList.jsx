import axios from "axios";
import React from "react";
import styled from "styled-components";
import Loader from "../Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function ReplyList({
	getFTCommentsInfo,
	getFLCommentsInfo,
	filmLogComments,
	filmTalkComments,
	userFLInfo,
	userFTInfo,
}) {
	let commentsInfo, userInfo;

	if (filmTalkComments) {
		commentsInfo = filmTalkComments;
		userInfo = userFTInfo;
	} else if (filmLogComments) {
		commentsInfo = filmLogComments;
		userInfo = userFLInfo;
	}

	const handleDelete = (id) => {
		Swal.fire({
			text: "삭제하시겠습니까?",
			icon: "question",
			iconColor: "#ff6347",
			showCancelButton: true,
			confirmButtonColor: "#189cc4",
			cancelButtonColor: "#ff6347",
			cancelButtonText: "취소",
			confirmButtonText: "삭제",
		}).then((result) => {
			if (result.isConfirmed) {
				if (filmTalkComments) {
					axios
						.delete(
							`${process.env.REACT_APP_API_URL}/filmtalk_comments/deletion/${id}`
						)
						.then(() => getFTCommentsInfo())
						.catch((err) => console.log(err));
				} else if (filmLogComments) {
					axios
						.delete(
							`${process.env.REACT_APP_API_URL}/filmlog_comments/deletion/${id}`
						)
						.then(() => getFLCommentsInfo())
						.catch((err) => console.log(err));
				}
			}
		});
	};

	const convertDate = (date) => {
		return date.split(" ")[0];
	};

	return (
		<>
			{commentsInfo === undefined ? (
				<Loader />
			) : (
				<ReplyBox>
					{commentsInfo.map((comment, idx) => {
						return (
							<Reply key={idx}>
								<Writer>{comment.nickname}</Writer>
								<Text>{comment.contents}</Text>
								{userInfo.id === comment.user_id ? (
									<>
										<FontAwesomeIcon
											icon={faTrashCan}
											className="icon"
											onClick={() => handleDelete(comment.id)}
										/>
									</>
								) : null}
								<Date>{convertDate(comment.createdAt)}</Date>
							</Reply>
						);
					})}
				</ReplyBox>
			)}
		</>
	);
}

const ReplyBox = styled.ul`
	/* border: 1px solid red; */
	display: flex;
	flex-direction: column;
	padding: 10px 0;
	@media screen and (max-width: 412px) {
		font-size: 10px;
	}
`;
const Reply = styled.li`
	/* border-bottom: 1px solid Gainsboro; */
	background: #f8f8f8;
	margin: 5px 0px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 5px;
	.icon {
		/* border: 1px solid green; */
		padding: 0px;
		font-size: 14px;
		color: #888;
		transition: 0.3s;
		&:hover {
			color: tomato;
			cursor: pointer;
		}
		@media screen and(max-width:412px) {
			.icon {
				margin-right: 10px;
				font-size: 10px;
				padding: 1px;
			}
		}
	}
`;
const Writer = styled.span`
	/* border: 1px solid green; */
	flex: 1 80px;
	padding: 10px;
	font-weight: 500;
	@media screen and(max-width:412px) {
		font-size: 12px;
	}
`;
const Text = styled.span`
	/* border: 1px solid green; */
	flex: 18 100px;
	font-size: 14px;
	padding: 5px;
	/* @media screen and(max-width:412px) {
		font-size: 10px;
	} */
`;
const Date = styled.span`
	/* border: 1px solid green; */
	flex: 1 80px;
	text-align: right;
	padding: 5px 10px;
	font-size: 13px;
	font-weight: 500;
	color: #999;
	@media screen and(max-width:412px) {
		/* flex: 0; */
		font-size: 10px;
	}
`;
