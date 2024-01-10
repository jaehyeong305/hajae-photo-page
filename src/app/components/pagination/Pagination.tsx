import React from "react";
import styles from "./pagination.module.css";
import Image from "next/image";
import arrowLeft from "/public/images/arrow_left.svg";
import arrowLeftDisable from "/public/images/arrow_left_disable.svg";
import arrowRight from "/public/images/arrow_right.svg";
import arrowRightDisable from "/public/images/arrow_right_disable.svg";

type PagenationProps = {
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PagenationProps> = ({ currentPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / 20);

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    // NOTE(hajae): 현재 페이지, 총 페이지 수에 따라 표시되는 페이지를 반환
    const generatePageNumbers = () => {
        const pageNumbers: number[] = [];

        // NOTE(hajae): pageNumbers에서 0은 ...을 표시한다.
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else if (currentPage <= 4) {
            for (let i = 1; i <= 5; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push(0);
            pageNumbers.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
            pageNumbers.push(1);
            pageNumbers.push(0);

            for (let i = totalPages - 4; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            pageNumbers.push(0);

            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pageNumbers.push(i);
            }

            pageNumbers.push(0);
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className={styles.Pagination}>
            <ul className={styles.PaginationBox}>
                {
                    currentPage === 1 ?
                        <li className={styles.Disabled}>
                            <Image src={arrowLeftDisable.src} width={16} height={16} alt="arrowLeft" />
                        </li> :
                        <li onClick={() => handlePageChange(currentPage - 1)}>
                            <Image src={arrowLeft.src} width={16} height={16} alt="arrowLeft" />
                        </li>
                }
                {generatePageNumbers().map((pageNumber, index) => (
                    pageNumber === 0 ? (
                        <li
                            key={index}
                            className={pageNumber === currentPage ? styles.Active : styles.Disabled}>
                            ...
                        </li>
                    ) : (
                        <li
                            key={index}
                            onClick={() => handlePageChange(pageNumber)}
                            className={pageNumber === currentPage ? styles.Active : ""}
                        >
                            {pageNumber}
                        </li>
                    )
                ))}
                {
                    currentPage === totalPages ?
                        <li className={styles.Disabled}>
                            <Image src={arrowRightDisable.src} width={16} height={16} alt="arrowLeft" />
                        </li> :
                        <li onClick={() => handlePageChange(currentPage + 1)}>
                            <Image src={arrowRight.src} width={16} height={16} alt="arrowLeft" />
                        </li>
                }
            </ul>
        </div>
    );
}

export default Pagination;