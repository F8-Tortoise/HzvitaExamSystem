<template>
  <div class="tiku">
    <div class="button">
      <el-button type="primary" @click="addShiti">新增试题 +</el-button>
      <!-- primary蓝色的按钮 -->
      <el-button type="primary">搜索</el-button>
    </div>

    <el-dialog
      :title="operateType === 'add' ? '新增试题' : '编辑试题'"
      :visible.sync="dialogVisible"
    >
      <!-- 表单 -->
      <el-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        label-width="100px"
      >
        <el-form-item
          v-for="item in operateFormLabel"
          :key="item.model"
          :label="item.label"
        >
          <el-input
            v-model="operateForm[item.model]"
            :placeholder="'请输入' + item.label"
            v-if="!item.type"
          >
          </el-input>
          <!-- 日期选择器 -->
          <el-date-picker
            v-model="operateForm[item.model]"
            type="date"
            placeholder="选择日期"
            v-if="item.type === 'date'"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 弹框底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="table">
      <el-table :data="tableData" height="92%" stripe>
        <el-table-column label="id" width="50">
          <template slot-scope="scope">
            <span>{{ (config.page - 1) * 15 + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!--show-overflow-tooltip让内容在一行显示，如果显示不下时，显示...,并且鼠标划过时显示全部文字  -->
        <el-table-column
          show-overflow-tooltip
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 100"
        >
          <!-- template代表一个插槽  scope插槽的作用域 通过其能使用里面的变量-->
          <template slot-scope="scope">
            <span>
              <!-- 每一行的数据 -->
              {{ scope.row[item.prop] }}
            </span>
          </template>
        </el-table-column>
        <!-- 另起一列放操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="tableData.length"
        :current-page.sync="config.page"
        :page-size="15"
        @current-change="changePage"
        class="pager"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      operateType: "add",
      dialogVisible: false,
      tableData: [],
      tableLabel: [
        {
          prop: "content",
          label: "题目内容",
          width: 250
        },
        {
          prop: "a",
          label: "A选项"
        },
        {
          prop: "b",
          label: "B选项"
        },
        {
          prop: "c",
          label: "C选项"
        },
        {
          prop: "d",
          label: "D选项"
        },
        {
          prop: "answer",
          label: "答案",
          width: 50
        },
        {
          prop: "createTime",
          label: "创建时间",
          type: "date",
          width: 150
        },
        {
          prop: "updateTime",
          label: "更新时间",
          type: "date",
          width: 150
        }
      ],
      operateForm: {
        content: "",
        a: "",
        b: "",
        c: "",
        d: "",
        answer: "",
        createTime: "",
        updateTime: ""
      },
      operateFormLabel: [
        {
          model: "content",
          label: "题目内容"
        },
        {
          model: "a",
          label: "A选项"
        },
        {
          model: "b",
          label: "B选项"
        },
        {
          model: "c",
          label: "C选项"
        },
        {
          model: "d",
          label: "D选项"
        },
        {
          model: "answer",
          label: "答案"
        },
        {
          model: "createTime",
          label: "创建时间"
        },
        {
          model: "updateTime",
          label: "更新时间"
        }
      ],
      config: {
        page: 1
      }
    };
  },
  methods: {
    handleEdit(row) {
      (this.dialogVisible = true), (this.operateType = "edit");
      this.operateForm = row;
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(row, 1);
          this.$message({
            type: "into",
            message: "已删除"
          });
        })
        .catch(() => {
          this.$message({
            type: "into",
            message: "已取消删除"
          });
        });
    },
    addShiti() {
      (this.dialogVisible = true),
        (this.operateType = "add"),
        (this.operateForm = {});
    },
    confirm() {
      if (this.operateType === "add") {
        this.tableData.unshift(this.operateForm);
        this.dialogVisible = false;
        this.$message({
          type: "into",
          message: "添加成功"
        });
      } else {
        this.dialogVisible = false;
        this.$message({
          type: "into",
          message: "编辑成功"
        });
      }
    },
    changePage(page) {
      console.log("page", page);
    }
  },

  mounted() {
    try {
      // 取试题
      axios({
        method: "get",
        url: "http://www.hzvita.com:4567/subject/getAllQuestions"
      }).then(res => {
        // console.log(res.data)
        this.tableData = res.data.data;
      });
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped>
.tiku {
  height: 100%;
  .button {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .table {
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>
