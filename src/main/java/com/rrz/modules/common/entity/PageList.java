package com.rrz.modules.common.entity;

import java.util.Collection;

public class PageList<T extends Pojo> implements Pojo {

    /**
     *
     */
    private static final long serialVersionUID = 862020554935213342L;

    private int currentPage;

    private int pageSize;

    /**
     * 查询的实体对象集合
     */
    private Collection<T> entities;

    /*
     * 实体对象数量
     */
    private int count;

    public PageList() {

    }

    public PageList(int currentPage, int pageSize, Collection<T> entities, int count) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.entities = entities;
        this.count = count;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Collection<T> getEntities() {
        return entities;
    }

    public void setEntities(Collection<T> entities) {
        this.entities = entities;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

}
