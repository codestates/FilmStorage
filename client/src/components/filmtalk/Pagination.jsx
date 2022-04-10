import styled from "styled-components";

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	margin: 16px;
	@media screen and (max-width: 486px) {
		margin-right: -240px;
	}
`;
const Button = styled.button`
	border: none;
	margin: 40px 0;
	padding: 10px;
	cursor: pointer;
	&:hover {
		background: tomato;
		transition: 0.3s;
	}
	&[disabled] {
		background: grey;
		cursor: revert;
	}
	&[aria-current] {
		background: tomato;
		cursor: revert;
	}
`;

function Pagination({ totalLength, page, setPage }) {
	const numPages = Math.ceil(totalLength / 10);

	return (
		<>
			<Nav>
				<Button onClick={() => setPage(page - 1)} disabled={page === 1}>
					&lt;
				</Button>
				{Array(numPages)
					.fill()
					.map((_, i) => (
						<Button
							key={i + 1}
							onClick={() => setPage(i + 1)}
							aria-current={page === i + 1 ? "page" : null}>
							{i + 1}
						</Button>
					))}
				<Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
					&gt;
				</Button>
			</Nav>
		</>
	);
}

export default Pagination;
