<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配菜单</span>
      </div>
      <el-tree
        ref="menu-tree"
        :data="menus"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="checkedKeys"
        show-checkbox
        node-key="id"
      ></el-tree>
      <div style="text-align:center">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenus () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },
    // 设置 default-keys
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },
    // 递归遍历
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },

    async onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys() // 拿到选中节点的ID
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      console.log(data)
      this.$message.success('操作成功')
      this.$router.back()
    },
    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
