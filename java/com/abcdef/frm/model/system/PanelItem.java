package com.abcdef.frm.model.system;
/**
 * IndexDisplay的子模型，用来描述首页的面板对象
 * @author F3201252-许健
 *
 */
public class PanelItem {
	private String panelId;
	private int column;
	private int row;
	public String getPanelId() {
		return panelId;
	}
	public void setPanelId(String panelId) {
		this.panelId = panelId;
	}
	public int getColumn() {
		return column;
	}
	public void setColumn(int column) {
		this.column = column;
	}
	public int getRow() {
		return row;
	}
	public void setRow(int row) {
		this.row = row;
	}

}